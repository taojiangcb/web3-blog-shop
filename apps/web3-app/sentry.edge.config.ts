import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2c9ce6ec28407a5ce1d3b80c3beedb36@o4508917793685504.ingest.us.sentry.io/4509075456131072",
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps


  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
