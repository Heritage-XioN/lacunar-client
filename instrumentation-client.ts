// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import { datadogRum } from '@datadog/browser-rum';

const DATADOG_APPLICATION_ID = process.env.NEXT_PUBLIC_DATADOG_APPLICATION_ID;
const DATADOG_CLIENT_TOKEN = process.env.NEXT_PUBLIC_DATADOG_CLIENT_TOKEN;
const DATADOG_SITE = process.env.NEXT_PUBLIC_DATADOG_SITE;

Sentry.init({
	dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

	// Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
	tracesSampleRate: 1,
	// Enable logs to be sent to Sentry
	enableLogs: true,

	// Enable sending user PII (Personally Identifiable Information)
	// https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
});

datadogRum.init({
	applicationId: DATADOG_APPLICATION_ID as string,
	clientToken: DATADOG_CLIENT_TOKEN as string,
	site: DATADOG_SITE as string,
	service: 'lacunar-client',
	env: process.env.NODE_ENV,
	version: '1.0.0',
	sessionSampleRate: 100,
	sessionReplaySampleRate: 20, // Keep this low or 0 if using Sentry Replay
	trackUserInteractions: true,
	trackResources: true,
	trackLongTasks: true,
	defaultPrivacyLevel: 'mask-user-input',
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
