export const AnalyticsEvent = Object.freeze({
  SEARCH_USED: 'search_used',
  RESET_CLICKED: 'reset_clicked',
  PROBLEM_OPENED: 'problem_opened',
  RUN_TESTS_CLICKED: 'run_tests_clicked',
  TESTS_COMPLETED: 'tests_completed',
  PROBLEM_PASSED: 'problem_passed',
  TESTS_TIMED_OUT: 'tests_timed_out',
});

type AnalyticsEventName = typeof AnalyticsEvent[keyof typeof AnalyticsEvent];
type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

export function track(name: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }

  if (typeof window.posthog?.capture === 'function') {
    window.posthog.capture(name, params);
  }
}