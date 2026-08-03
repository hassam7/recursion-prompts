import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PROBLEMS_DIR = path.join(ROOT, 'problems');

export async function getProblems() {
  const manifestPath = path.join(PROBLEMS_DIR, 'manifest.json');
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  return manifest;
}

export async function getProblemBySlug(slug) {
  const problems = await getProblems();
  return problems.find((problem) => problem.slug === slug) || null;
}

export async function getProblemPrompt(problem) {
  const problemPath = path.join(PROBLEMS_DIR, problem.dir, 'problem.js');
  const source = await fs.readFile(problemPath, 'utf8');
  return extractPrompt(source);
}

export function extractPrompt(source) {
  const lines = source.split('\n');
  const promptLines = [];

  for (const line of lines) {
    if (/^\s*(var|let|const|function)\s+/.test(line)) {
      break;
    }

    const cleaned = line
      .replace(/^\s*\/\*+\s?/, '')
      .replace(/\s?\*\/\s*$/, '')
      .replace(/^\s*\/\/\s?/, '')
      .trimEnd();

    if (/^jshint\b/.test(cleaned)) {
      continue;
    }

    promptLines.push(cleaned);
  }

  return promptLines
    .join('\n')
    .replace(/Solve the following prompt using recursion\.\s*/i, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function getProblemDescription(problem) {
  return `Practice the ${problem.title} recursion challenge in JavaScript with a prompt, starter code, and browser-based tests.`;
}

export function siteUrl(pathname = '/') {
  const baseUrl = 'https://recursion.hassamali.com';
  return new URL(pathname, baseUrl).toString();
}