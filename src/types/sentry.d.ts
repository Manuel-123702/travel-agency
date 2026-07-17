declare module "@sentry/node" {
  const Sentry: {
    init(options: {
      dsn?: string;
      environment?: string;
      tracesSampleRate?: number;
    }): void;
    captureException(error: unknown): void;
  };

  export default Sentry;
}

declare module "@sentry/tracing" {
  export const BrowserTracing: unknown;
  export const Integrations: unknown;
}
