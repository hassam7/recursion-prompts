export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, targetId: string | Date, config?: Record<string, unknown>) => void;
    posthog?: {
      capture?: (name: string, properties?: Record<string, unknown>) => void;
      init?: (projectKey: string, config: Record<string, unknown>, name?: string) => void;
      __SV?: number;
      _i?: unknown[];
      [key: string]: unknown;
    } | unknown[];
  }
}