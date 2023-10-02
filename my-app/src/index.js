import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router-dom";
import React from "react";
import * as Sentry from "@sentry/react";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";

Sentry.init({
  dsn: "https://9fb8c1780441b523eaf004629978be0d@o4505884115730432.ingest.sentry.io/4505884134277120",
  integrations: [
    new Sentry.BrowserTracing({
      // See docs for support of different versions of variation of react router
      // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        React.useLocation,
        React.useNavigationType,
        React.createRoutesFromChildren,
        React.matchRoutes
      ),
    }),
    new Sentry.Replay()
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  tracesSampleRate: 1.0,

  // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const container = document.getElementById(
  "root");
const root = createRoot(container);
root.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>
);