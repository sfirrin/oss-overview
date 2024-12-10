// Necessary if using App Router to ensure this file runs on the client
"use client";

import { datadogRum } from "@datadog/browser-rum";

datadogRum.init({
  applicationId: "63ec0479-0f76-406f-8748-7999c0fb646c",
  clientToken: "pubbb216455f83a647fa163fe5cc74ba939",
  site: "datadoghq.com",
  service: "oss-overview",
  env: "prod",
  // Specify a version number to identify the deployed version of your application in Datadog
  // version: '1.0.0',
  sessionSampleRate: 100,
  sessionReplaySampleRate: 100,
  trackUserInteractions: true,
  trackResources: true,
  trackLongTasks: true,
  defaultPrivacyLevel: "mask-user-input",
  // Specify URLs to propagate trace headers for connection between RUM and backend trace
  allowedTracingUrls: [
    { match: "https://example.com/api/", propagatorTypes: ["tracecontext"] },
  ],
});

export default function DatadogInit() {
  // Render nothing - this component is only included so that the init code
  // above will run client-side
  return null;
}
