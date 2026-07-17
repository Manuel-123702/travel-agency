import { Counter, Gauge, collectDefaultMetrics, register } from "prom-client";

collectDefaultMetrics({ register });

const rateLimitExceeded = new Counter({
  name: "rate_limit_exceeded_total",
  help: "Total number of rate limit rejections",
});

const rateLimitAllowed = new Counter({
  name: "rate_limit_allowed_total",
  help: "Total number of allowed requests under rate limits",
});

const healthCheckTotal = new Counter({
  name: "health_check_total",
  help: "Total number of health check requests",
});

const aiAssistantRequests = new Counter({
  name: "ai_assistant_requests_total",
  help: "Total number of AI assistant requests",
});

const aiDocumentChecks = new Counter({
  name: "ai_document_checks_total",
  help: "Total number of AI document checker requests",
});

const aiIngestRequests = new Counter({
  name: "ai_ingest_requests_total",
  help: "Total number of AI content ingestion requests",
});

const serviceHealthStatus = new Gauge({
  name: "service_healthy",
  help: "Overall service health status where 1 indicates healthy and 0 indicates unhealthy",
});

const redisHealthStatus = new Gauge({
  name: "redis_healthy",
  help: "Redis health status where 1 indicates healthy and 0 indicates unhealthy",
});

export function incRateAllowed() {
  try {
    rateLimitAllowed.inc();
  } catch (e) {
    console.error("metrics incRateAllowed error", e);
  }
}

export function incRateExceeded() {
  try {
    rateLimitExceeded.inc();
  } catch (e) {
    console.error("metrics incRateExceeded error", e);
  }
}

export function incAiAssistantRequest() {
  try {
    aiAssistantRequests.inc();
  } catch (e) {
    console.error("metrics incAiAssistantRequest error", e);
  }
}

export function incAiDocumentCheck() {
  try {
    aiDocumentChecks.inc();
  } catch (e) {
    console.error("metrics incAiDocumentCheck error", e);
  }
}

export function incAiIngestRequest() {
  try {
    aiIngestRequests.inc();
  } catch (e) {
    console.error("metrics incAiIngestRequest error", e);
  }
}

export function incHealthCheck() {
  try {
    healthCheckTotal.inc();
  } catch (e) {
    console.error("metrics incHealthCheck error", e);
  }
}

export function setServiceHealthy(isHealthy: boolean) {
  try {
    serviceHealthStatus.set(isHealthy ? 1 : 0);
  } catch (e) {
    console.error("metrics setServiceHealthy error", e);
  }
}

export function setRedisHealthy(isHealthy: boolean) {
  try {
    redisHealthStatus.set(isHealthy ? 1 : 0);
  } catch (e) {
    console.error("metrics setRedisHealthy error", e);
  }
}

export async function getMetrics() {
  return await register.metrics();
}

export const metricsContentType = register.contentType || "text/plain; version=0.0.4; charset=utf-8";
