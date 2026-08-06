import { useEffect, useRef, useState } from 'react';

import { AnalyticsEvent, track } from '../../playground/analytics';
import { loadMochaCss, loadProblemSpec, prefetchTestLibraries } from '../../playground/problemService';
import type { LibraryCache, Problem } from '../../playground/problemService';
import { runTestsInFrame } from '../../playground/testRunner';
import type { TestRunResult } from '../../playground/testRunner';
import { problemParams } from './useProblemSession';

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

interface RunTestsOptions {
  currentProblem: Problem | null;
  codeDraft: string;
  onPersistCode: () => void;
}

export function usePlaygroundTestRunner() {
  const testFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [libCache, setLibCache] = useState<LibraryCache | null>(null);
  const [resultCache, setResultCache] = useState<Record<number, TestRunResult>>({});
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [timedOutProblem, setTimedOutProblem] = useState<number | null>(null);

  async function runTests({ currentProblem, codeDraft, onPersistCode }: RunTestsOptions) {
    if (!currentProblem || isRunning || !libCache || !testFrameRef.current) {
      return;
    }

    setIsRunning(true);
    setTimedOutProblem(null);
    onPersistCode();
    track(AnalyticsEvent.RUN_TESTS_CLICKED, problemParams(currentProblem));

    try {
      const [specCode, mochaCss] = await Promise.all([
        loadProblemSpec(currentProblem),
        loadMochaCss(),
      ]);

      const result = await runTestsInFrame(testFrameRef.current, {
        code: codeDraft,
        specCode,
        libCache,
        mochaCss,
      });

      setResultCache((previous) => ({ ...previous, [currentProblem.num]: result }));
      track(AnalyticsEvent.TESTS_COMPLETED, {
        ...problemParams(currentProblem),
        tests_passed: result.stats.passes,
        tests_failed: result.stats.failures,
        tests_total: result.stats.passes + result.stats.failures,
      });

      if (result.stats.failures === 0) {
        track(AnalyticsEvent.PROBLEM_PASSED, {
          ...problemParams(currentProblem),
          tests_total: result.stats.passes + result.stats.failures,
        });
      }
    } catch (error) {
      if (getErrorMessage(error) === 'Test run timed out.') {
        setTimedOutProblem(currentProblem.num);
        track(AnalyticsEvent.TESTS_TIMED_OUT, problemParams(currentProblem));
      } else {
        window.alert(`Could not run tests: ${getErrorMessage(error)}`);
      }
    } finally {
      setIsRunning(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const loadedLibCache = await prefetchTestLibraries();
        if (ignore) {
          return;
        }

        setLibCache(loadedLibCache);
        setIsLoading(false);
      } catch (error) {
        setLoadError(getErrorMessage(error));
        setIsLoading(false);
        console.error(error);
      }
    }

    init();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    testFrameRef,
    resultCache,
    isRunning,
    isLoading,
    loadError,
    timedOutProblem,
    clearTimedOutProblem: () => setTimedOutProblem(null),
    runTests,
  };
}