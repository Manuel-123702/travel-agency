let register: any = null;
let metricsContentType = "text/plain; version=0.0.4; charset=utf-8";

let rateLimitExceeded: any = null;
let rateLimitAllowed: any = null;
let healthCheckTotal: any = null;
let aiAssistantRequests: any = null;
let aiDocumentChecks: any = null;
let aiIngestRequests: any = null;
let serviceHealthStatus: any = null;
let redisHealthStatus: any = null;

try {
  // Dynamically require prom-client so local dev without the package doesn't crash
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const dynamicRequire = eval("require");
  const promClient = dynamicRequire("prom-client");
  const { Counter, Gauge, collectDefaultMetrics } = promClient;
  register = promClient.register;
  collectDefaultMetrics({ register });

  rateLimitExceeded = new Counter({
    name: "rate_limit_exceeded_total",
    help: "Total number of rate limit rejections",
  });
  rateLimitAllowed = new Counter({
    name: "rate_limit_allowed_total",
    help: "Total number of allowed requests under rate limits",
  });
  healthCheckTotal = new Counter({
    name: "health_check_total",
    help: "Total number of health check requests",
  });
  aiAssistantRequests = new Counter({
    name: "ai_assistant_requests_total",
    help: "Total number of AI assistant requests",
  });
  aiDocumentChecks = new Counter({
    name: "ai_document_checks_total",
    help: "Total number of AI document checker requests",
  });
  aiIngestRequests = new Counter({
    name: "ai_ingest_requests_total",
    help: "Total number of AI content ingestion requests",
  });
  serviceHealthStatus = new Gauge({
    name: "service_healthy",
    help: "Overall service health status where 1 indicates healthy and 0 indicates unhealthy",
  });
  redisHealthStatus = new Gauge({
    name: "redis_healthy",
    help: "Redis health status where 1 indicates healthy and 0 indicates unhealthy",
  });

  metricsContentType = register.contentType || metricsContentType;
} catch (e) {
  // prom-client not installed — expose no-op functions
  // console.warn("prom-client not available, metrics disabled");
}

function safeInc(counter: any) {
  try {
    counter?.inc?.();
  } catch (e) {
    /* ignore */
  }
}

function safeSet(gauge: any, v: number) {
  try {
    gauge?.set?.(v);
  } catch (e) {
    /* ignore */
  }
}

export function incRateAllowed() {
  safeInc(rateLimitAllowed);
}
export function incRateExceeded() {
  safeInc(rateLimitExceeded);
}
export function incAiAssistantRequest() {
  safeInc(aiAssistantRequests);
}
export function incAiDocumentCheck() {
  safeInc(aiDocumentChecks);
}
export function incAiIngestRequest() {
  safeInc(aiIngestRequests);
}
export function incHealthCheck() {
  safeInc(healthCheckTotal);
}
export function setServiceHealthy(isHealthy: boolean) {
  safeSet(serviceHealthStatus, isHealthy ? 1 : 0);
}
export function setRedisHealthy(isHealthy: boolean) {
  safeSet(redisHealthStatus, isHealthy ? 1 : 0);
}

export async function getMetrics() {
  return register ? await register.metrics() : "";
}

export { metricsContentType };
