import { rateLimit } from "../src/lib/rateLimiter";

async function run() {
  console.log("Starting rate limiter test (memory fallback expected)");
  const key = `test:${Date.now()}`;
  for (let i = 1; i <= 5; i++) {
    const r = await rateLimit(key, 3, 60); // limit 3 per minute
    console.log(i, r);
  }
}

run().catch((e) => {
  console.error("Test failed", e);
  process.exit(1);
});
