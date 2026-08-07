import { useEffect, useMemo, useRef, useState } from 'react';

import { AnalyticsEvent, track } from '../../playground/analytics';
import { loadManifest, loadProblemDescription, loadProblemSpec, loadProblemStub } from '../../playground/problemService';
import type { Problem } from '../../playground/problemService';
import { getProblemFromURL, pushProblemToHistory, replaceProblemInHistory } from './useProblemRouting';

export interface OpenProblemOptions {
  pushHistory?: boolean;
}

export function problemParams(problem: Problem) {
  return {
    problem_num: problem.num,
    problem_slug: problem.slug,
    problem_title: problem.title,
  };
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

interface UseProblemSessionOptions {
  isNavigationLocked: boolean;
  onProblemOpened?: () => void;
}

export function useProblemSession({ isNavigationLocked, onProblemOpened }: UseProblemSessionOptions) {
  const latestOpenRequestId = useRef(0);
  const [manifest, setManifest] = useState<Problem[]>([]);
  const [currentProblemNumber, setCurrentProblemNumber] = useState(1);
  const [stubCache, setStubCache] = useState<Record<number, string>>({});
  const [descriptionCache, setDescriptionCache] = useState<Record<number, string>>({});
  const [specCache, setSpecCache] = useState<Record<number, string>>({});
  const [userCode, setUserCode] = useState<Record<number, string>>({});
  const [codeDraft, setCodeDraft] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  const currentIndex = manifest.findIndex((problem) => problem.num === currentProblemNumber);
  const currentProblem = currentIndex >= 0 ? manifest[currentIndex] || null : null;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < manifest.length - 1;

  const problemByNumber = useMemo(() => {
    return new Map(manifest.map((problem) => [problem.num, problem]));
  }, [manifest]);

  async function openProblem(problemNumber: number, options: OpenProblemOptions = {}) {
    if (isNavigationLocked) {
      return;
    }

    const problem = problemByNumber.get(problemNumber);
    if (!problem) {
      return;
    }

    const openRequestId = latestOpenRequestId.current + 1;
    latestOpenRequestId.current = openRequestId;

    const [nextStub, nextDescription, nextSpec] = await Promise.all([
      stubCache[problemNumber] || loadProblemStub(problem),
      descriptionCache[problemNumber] || loadProblemDescription(problem),
      specCache[problemNumber] || loadProblemSpec(problem),
    ]);

    if (latestOpenRequestId.current !== openRequestId) {
      return;
    }

    if (!stubCache[problemNumber]) {
      setStubCache((previous) => ({ ...previous, [problemNumber]: nextStub }));
    }
    if (!descriptionCache[problemNumber]) {
      setDescriptionCache((previous) => ({ ...previous, [problemNumber]: nextDescription }));
    }
    if (!specCache[problemNumber]) {
      setSpecCache((previous) => ({ ...previous, [problemNumber]: nextSpec }));
    }

    const savedCode = userCode[problemNumber];
    setCurrentProblemNumber(problemNumber);
    setCodeDraft(savedCode !== undefined && savedCode.trim().length > 0 ? savedCode : nextStub);
    onProblemOpened?.();

    if (options.pushHistory) {
      pushProblemToHistory(problemNumber);
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

  function persistCurrentDraft() {
    if (!currentProblem) {
      return;
    }

    setUserCode((previous) => ({ ...previous, [currentProblem.num]: codeDraft }));
  }

  useEffect(() => {
    let ignore = false;

    async function init() {
      try {
        const loadedManifest = await loadManifest();

        if (ignore) {
          return;
        }

        const startProblemNumber = getProblemFromURL(loadedManifest.length);
        const startProblem = loadedManifest.find((problem) => problem.num === startProblemNumber) || loadedManifest[0];
        if (!startProblem) {
          throw new Error('No problems found.');
        }

        const [startStub, startDescription, startSpec] = await Promise.all([
          loadProblemStub(startProblem),
          loadProblemDescription(startProblem),
          loadProblemSpec(startProblem),
        ]);

        if (ignore) {
          return;
        }

        setManifest(loadedManifest);
        setCurrentProblemNumber(startProblem.num);
        setStubCache({ [startProblem.num]: startStub });
        setDescriptionCache({ [startProblem.num]: startDescription });
        setSpecCache({ [startProblem.num]: startSpec });
        setCodeDraft(startStub);
        setIsLoading(false);
        replaceProblemInHistory(startProblem.num);
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

  return {
    manifest,
    currentProblemNumber,
    currentProblem,
    hasPrevious,
    hasNext,
    descriptionHtml: descriptionCache[currentProblemNumber] || '',
    specText: specCache[currentProblemNumber] || '',
    codeDraft,
    isLoading,
    loadError,
    openProblem,
    handlePrevious,
    handleNext,
    handleCodeChange,
    handleReset,
    persistCurrentDraft,
  };
}