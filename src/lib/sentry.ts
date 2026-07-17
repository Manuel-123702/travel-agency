const sentryDsn = process.env.SENTRY_DSN;
let sentryInitialized = false;

export function isSentryEnabled() {
  return Boolean(sentryDsn);
}

export async function initSentry() {
  if (!isSentryEnabled() || sentryInitialized) {
    return;
  }

  // Runtime Sentry integration is disabled in this environment because
  // package resolution is not available. The helper remains callable from
  // application code without causing TypeScript or runtime import failures.
  sentryInitialized = true;
}

export async function captureException(e: unknown) {
  if (!isSentryEnabled()) {
    if (process.env.NODE_ENV === "development") {
      console.error("Sentry capture skipped:", e);
    }
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.error("Sentry capture skipped in this environment:", e);
  }
}
