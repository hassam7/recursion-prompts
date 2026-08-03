import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const PROBLEMS_DIR = path.join(ROOT, 'problems');

/**
 * @typedef {object} Problem
 * @property {number} num
 * @property {string} slug
 * @property {string} title
 * @property {string} dir
 */

/** @returns {Promise<Problem[]>} */
export async function getProblems() {
  const entries = await fs.readdir(PROBLEMS_DIR, { withFileTypes: true });
  const problemDirs = entries
    .filter((entry) => entry.isDirectory() && /^\d+-/.test(entry.name))
    .map((entry) => entry.name)
    .sort((first, second) => getProblemNumber(first) - getProblemNumber(second));

  return Promise.all(problemDirs.map(async (dir) => {
    const metaPath = path.join(PROBLEMS_DIR, dir, 'meta.json');
    const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));

    return {
      num: getProblemNumber(dir),
      slug: getProblemSlug(dir),
      title: meta.title,
      dir,
    };
  }));
}

/**
 * @param {string} slug
 * @returns {Promise<Problem | null>}
 */
export async function getProblemBySlug(slug) {
  const problems = await getProblems();
  return problems.find((problem) => problem.slug === slug) || null;
}

/** @param {Problem} problem */
export async function getProblemDescriptionHtml(problem) {
  const descriptionPath = path.join(PROBLEMS_DIR, problem.dir, 'description.html');
  return fs.readFile(descriptionPath, 'utf8');
}

/** @param {Problem} problem */
export async function getProblemDescription(problem) {
  const descriptionHtml = await getProblemDescriptionHtml(problem);
  const text = htmlToText(descriptionHtml);
  return text || `Practice the ${problem.title} recursion challenge in JavaScript with starter code and browser-based tests.`;
}

export function siteUrl(pathname = '/') {
  const baseUrl = 'https://recursion.hassamali.com';
  return new URL(pathname, baseUrl).toString();
}

function getProblemNumber(dir) {
  return Number.parseInt(dir.split('-')[0], 10);
}

function getProblemSlug(dir) {
  return dir.replace(/^\d+-/, '');
}

function htmlToText(html) {
  return html
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}