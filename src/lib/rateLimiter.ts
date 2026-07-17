import { Redis } from "@upstash/redis";
import { incRateAllowed, incRateExceeded } from "@/lib/metrics";
import { captureException, initSentry } from "@/lib/sentry";

type RateResult = { ok: boolean; remaining: number; resetAt: number; limit: number; windowSeconds: number };

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let redis: Redis | null = null;
if (UPSTASH_URL && UPSTASH_TOKEN) {
  try {
    redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });
    // init Sentry early if configured
    try {
      initSentry();
    } catch (e) {
      console.error("Sentry init error", e);
    }
  } catch (e) {
    console.error("Failed to init Upstash Redis client", e);
    redis = null;
  }
}

// In-memory fallback
const memStore = new Map<string, { count: number; resetAt: number }>();

export async function isRedisHealthy(): Promise<boolean> {
  if (!redis) return false;
  try {
    // attempt a harmless GET; network errors will throw
    await redis.get("__upstash_health_check");
    return true;
  } catch (e) {
    console.error("Redis health check failed", e);
    try { setRedisHealthy(false); } catch (_) {}
    return false;
  }
}

export async function rateLimit(key: string, limit = 60, windowSeconds = 3600): Promise<RateResult> {
  const now = Math.floor(Date.now() / 1000);

  if (redis) {
    try {
      const healthy = await isRedisHealthy();
      if (!healthy) throw new Error("redis unhealthy");

      const res = await redis.incr(key);
      if (res === 1) {
        await redis.expire(key, windowSeconds);
      }
      const ttl = await redis.ttl(key);
      const remaining = Math.max(0, limit - res);
      const result = { ok: res <= limit, remaining, resetAt: now + ttl, limit, windowSeconds };
      if (result.ok) incRateAllowed(); else incRateExceeded();
      return result;
    } catch (e) {
      console.error("Redis rateLimit error, falling back to memory store", e);
      try { captureException(e); } catch (_) {}
      // fallthrough to memStore fallback
    }
  }

  // In-memory fallback (not suitable for multi-instance)
  const existing = memStore.get(key);
  if (!existing || existing.resetAt <= now) {
    memStore.set(key, { count: 1, resetAt: now + windowSeconds });
    const ok = 1 <= limit;
    if (ok) incRateAllowed(); else incRateExceeded();
    return { ok, remaining: limit - 1, resetAt: now + windowSeconds, limit, windowSeconds };
  }

  existing.count += 1;
  memStore.set(key, existing);
  const ok = existing.count <= limit;
  if (ok) incRateAllowed(); else incRateExceeded();
  return { ok, remaining: Math.max(0, limit - existing.count), resetAt: existing.resetAt, limit, windowSeconds };
}
