import { NextResponse } from "next/server";
import { isSentryEnabled } from "@/lib/sentry";
import { isRedisHealthy } from "@/lib/rateLimiter";
import { db } from "@/lib/db";
import { incHealthCheck, setRedisHealthy, setServiceHealthy } from "@/lib/metrics";

const serviceName = process.env.NEXT_PUBLIC_APP_NAME || "Travel Agency";
const serviceVersion = process.env.npm_package_version || "unknown";

export async function GET() {
  incHealthCheck();

  const sentry = isSentryEnabled();
  const redis = await isRedisHealthy();
  setRedisHealthy(redis);

  let databaseHealthy = false;
  let databaseError: string | null = null;

  try {
    await db.$queryRaw`SELECT 1`;
    databaseHealthy = true;
  } catch (error) {
    databaseError = (error as Error)?.message ?? "Database health check failed";
  }

  const healthy = redis && databaseHealthy;
  setServiceHealthy(healthy);

  const status = healthy ? 200 : 503;

  return NextResponse.json(
    {
      ok: healthy,
      healthy,
      service: {
        name: serviceName,
        version: serviceVersion,
        uptimeSeconds: Math.floor(process.uptime()),
      },
      environment: process.env.NODE_ENV || "development",
      sentry: {
        enabled: sentry,
        dsn: sentry ? !!process.env.SENTRY_DSN : false,
      },
      redis: {
        enabled: Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN),
        healthy: redis,
      },
      database: {
        healthy: databaseHealthy,
        error: databaseError,
      },
      timestamp: new Date().toISOString(),
    },
    { status, headers: { "Cache-Control": "no-store" } }
  );
}
