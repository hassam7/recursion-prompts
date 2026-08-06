import { useEffect } from 'react';

import type { OpenProblemOptions } from './useProblemSession';

export function getProblemFromURL(problemCount: number) {
  const params = new URLSearchParams(window.location.search);
  const problemNumber = parseInt(params.get('problem') || '', 10);
  if (!problemNumber || problemNumber < 1 || problemNumber > problemCount) {
    return 1;
  }

  return problemNumber;
}

export function pushProblemToHistory(problemNumber: number) {
  window.history.pushState({ problem: problemNumber }, '', `?problem=${problemNumber}`);
}

export function replaceProblemInHistory(problemNumber: number) {
  window.history.replaceState({ problem: problemNumber }, '', `?problem=${problemNumber}`);
}

interface UseProblemPopStateOptions {
  problemCount: number;
  onOpenProblem: (problemNumber: number, options?: OpenProblemOptions) => void;
}

export function useProblemPopState({ problemCount, onOpenProblem }: UseProblemPopStateOptions) {
  useEffect(() => {
    function handlePopState(event: PopStateEvent) {
      const state = event.state as { problem?: number } | null;
      const problemNumber = state?.problem || getProblemFromURL(problemCount);
      onOpenProblem(problemNumber, { pushHistory: false });
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [problemCount, onOpenProblem]);
}