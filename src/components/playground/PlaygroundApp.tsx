import { useEffect, useMemo, useRef, useState } from 'react';
import { AnalyticsEvent, track } from '../../playground/analytics';
import { loadManifest, loadMochaCss, loadProblemDescription, loadProblemSpec, loadProblemStub, prefetchTestLibraries } from '../../playground/problemService';
import type { LibraryCache, Problem } from '../../playground/problemService';
import { runTestsInFrame } from '../../playground/testRunner';
import type { TestRunResult } from '../../playground/testRunner';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { EditorPanel } from './EditorPanel';
import { ResultsPanel } from './ResultsPanel';
import styles from './PlaygroundApp.module.css';

interface OpenProblemOptions {
  pushHistory?: boolean;
}

function getProblemFromURL(problemCount: number) {
  const params = new URLSearchParams(window.location.search);
  const problemNumber = parseInt(params.get('problem') || '', 10);
  if (!problemNumber || problemNumber < 1 || problemNumber > problemCount) {
    return 1;
  }

  return problemNumber;
}

function problemParams(problem: Problem) {
  return {
    problem_num: problem.num,
    problem_slug: problem.slug,
    problem_title: problem.title,
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

export default function PlaygroundApp() {
  const testFrameRef = useRef<HTMLIFrameElement | null>(null);
  const [manifest, setManifest] = useState<Problem[]>([]);
  const [currentProblemNumber, setCurrentProblemNumber] = useState(1);
  const [stubCache, setStubCache] = useState<Record<number, string>>({});
  const [descriptionCache, setDescriptionCache] = useState<Record<number, string>>({});
  const [userCode, setUserCode] = useState<Record<number, string>>({});
  const [codeDraft, setCodeDraft] = useState('');
  const [libCache, setLibCache] = useState<LibraryCache | null>(null);
  const [resultCache, setResultCache] = useState<Record<number, TestRunResult>>({});
  const [searchFilter, setSearchFilter] = useState('');
  const [searchTracked, setSearchTracked] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [timedOutProblem, setTimedOutProblem] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const currentIndex = manifest.findIndex((problem) => problem.num === currentProblemNumber);
  const currentProblem = currentIndex >= 0 ? manifest[currentIndex] || null : null;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < manifest.length - 1;

  const currentResult = resultCache[currentProblemNumber];
  const isTimeout = timedOutProblem === currentProblemNumber;

  const problemByNumber = useMemo(() => {
    return new Map(manifest.map((problem) => [problem.num, problem]));
  }, [manifest]);

  async function openProblem(problemNumber: number, options: OpenProblemOptions = {}) {
    if (isRunning) {
      return;
    }

    const problem = problemByNumber.get(problemNumber);
    if (!problem) {
      return;
    }

    const [nextStub, nextDescription] = await Promise.all([
      stubCache[problemNumber] || loadProblemStub(problem),
      descriptionCache[problemNumber] || loadProblemDescription(problem),
    ]);

    if (!stubCache[problemNumber]) {
      setStubCache((previous) => ({ ...previous, [problemNumber]: nextStub }));
    }
    if (!descriptionCache[problemNumber]) {
      setDescriptionCache((previous) => ({ ...previous, [problemNumber]: nextDescription }));
    }

    const savedCode = userCode[problemNumber];
    setCurrentProblemNumber(problemNumber);
    setCodeDraft(savedCode !== undefined && savedCode.trim().length > 0 ? savedCode : nextStub);
    setTimedOutProblem(null);
    setMenuOpen(false);

    if (options.pushHistory) {
      window.history.pushState({ problem: problemNumber }, '', `?problem=${problemNumber}`);
    }

    track(AnalyticsEvent.PROBLEM_OPENED, problemParams(problem));
  }

  function handlePrevious() {
    const previousProblem = manifest[currentIndex - 1];
    if (hasPrevious && previousProblem) {
      openProblem(previousProblem.num, { pushHistory: true });
    }
  }

  function handleNext() {
    const nextProblem = manifest[currentIndex + 1];
    if (hasNext && nextProblem) {
      openProblem(nextProblem.num, { pushHistory: true });
    }
  }

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const [loadedManifest, loadedLibCache] = await Promise.all([
          loadManifest(),
          prefetchTestLibraries(),
        ]);

        if (ignore) {
          return;
        }

        const startProblemNumber = getProblemFromURL(loadedManifest.length);
        const startProblem = loadedManifest.find((problem) => problem.num === startProblemNumber) || loadedManifest[0];
        if (!startProblem) {
          throw new Error('No problems found.');
        }

        const [startStub, startDescription] = await Promise.all([
          loadProblemStub(startProblem),
          loadProblemDescription(startProblem),
        ]);

        if (ignore) {
          return;
        }

        setManifest(loadedManifest);
        setLibCache(loadedLibCache);
        setCurrentProblemNumber(startProblem.num);
        setStubCache({ [startProblem.num]: startStub });
        setDescriptionCache({ [startProblem.num]: startDescription });
        setCodeDraft(startStub);
        setIsLoading(false);
        window.history.replaceState({ problem: startProblem.num }, '', `?problem=${startProblem.num}`);
        track(AnalyticsEvent.PROBLEM_OPENED, problemParams(startProblem));
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

  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { problem?: number } | null;
      const problemNumber = state?.problem || getProblemFromURL(manifest.length);
      openProblem(problemNumber, { pushHistory: false });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [manifest, problemByNumber, stubCache, descriptionCache, userCode, isRunning]);

  function handleCodeChange(nextCode: string) {
    if (!currentProblem) {
      return;
    }

    setCodeDraft(nextCode);
    setUserCode((previous) => ({ ...previous, [currentProblem.num]: nextCode }));
  }

  function handleReset() {
    if (!currentProblem) {
      return;
    }

    const stub = stubCache[currentProblem.num] || '';
    setCodeDraft(stub);
    setUserCode((previous) => {
      const next = { ...previous };
      delete next[currentProblem.num];
      return next;
    });
    track(AnalyticsEvent.RESET_CLICKED, problemParams(currentProblem));
  }

  function handleSearch(nextFilter: string) {
    setSearchFilter(nextFilter);
    if (!searchTracked && nextFilter.trim().length > 0) {
      setSearchTracked(true);
      track(AnalyticsEvent.SEARCH_USED);
    }
  }

  async function handleRunTests() {
    if (!currentProblem || isRunning || !libCache || !testFrameRef.current) {
      return;
    }

    setIsRunning(true);
    setTimedOutProblem(null);
    setUserCode((previous) => ({ ...previous, [currentProblem.num]: codeDraft }));
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

  if (isLoading) {
    return <div className={styles.loadingScreen}>Loading problems...</div>;
  }

  if (loadError) {
    return <div className={styles.loadingScreen}>Could not load playground: {loadError}</div>;
  }

  return (
    <div className={styles.playgroundShell}>
      <Header
        currentProblem={currentProblem}
        totalProblems={manifest.length}
        isRunning={isRunning}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onRun={handleRunTests}
      />

      <Sidebar
        manifest={manifest}
        currentProblemNumber={currentProblemNumber}
        resultCache={resultCache}
        filter={searchFilter}
        isOpen={menuOpen}
        onFilterChange={handleSearch}
        onSelect={(problemNumber) => openProblem(problemNumber, { pushHistory: true })}
        onClose={() => setMenuOpen(false)}
      />

      <EditorPanel
        problem={currentProblem}
        descriptionHtml={descriptionCache[currentProblemNumber] || ''}
        code={codeDraft}
        onCodeChange={handleCodeChange}
        onReset={handleReset}
        onRunShortcut={handleRunTests}
      />

      <ResultsPanel result={currentResult} isTimeout={isTimeout} />

      <iframe
        ref={testFrameRef}
        className={styles.testFrame}
        title="Sandboxed test runner"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}