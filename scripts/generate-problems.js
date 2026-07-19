#!/usr/bin/env node
/**
 * generate-problems.js
 * Reads spec/part1.js, spec/part2.js, and src/recursion.js
 * and creates problems/NN-<name>/ directories, each with:
 *   - problem.js  (comment block + stub function from recursion.js)
 *   - spec.js     (single describe() block for this problem)
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const ROOT      = path.join(__dirname, '..');
const PART1     = fs.readFileSync(path.join(ROOT, 'spec/part1.js'), 'utf8');
const PART2     = fs.readFileSync(path.join(ROOT, 'spec/part2.js'), 'utf8');
const RECURSION = fs.readFileSync(path.join(ROOT, 'src/recursion.js'), 'utf8');

// ─── Problem metadata ────────────────────────────────────────────────────────
// Each entry: [ paddedNum, slug, describeTitleFragment, specSource ]
const PROBLEMS = [
  ['01', 'factorial',          '1. Factorial',                          PART1],
  ['02', 'sum',                '2. Sum of Integers',                    PART1],
  ['03', 'array-sum',          '3. Sum Integers in Array',              PART1],
  ['04', 'is-even',            '4. Check if Even',                      PART1],
  ['05', 'sum-below',          '5. Sum Below',                          PART1],
  ['06', 'range',              '6. Integer Range',                      PART1],
  ['07', 'exponent',           '7. Compute Exponent',                   PART1],
  ['08', 'power-of-two',       '8. Power of Two',                       PART1],
  ['09', 'reverse',            '9. Reverse String',                     PART1],
  ['10', 'palindrome',         '10. Palindrome',                        PART1],
  ['11', 'modulo',             '11. Modulo',                            PART1],
  ['12', 'multiply',           '12. Multiply',                          PART1],
  ['13', 'divide',             '13. Divide',                            PART1],
  ['14', 'gcd',                '14. Greatest Common Divisor',           PART1],
  ['15', 'compare-str',        '15. Compare Strings',                   PART1],
  ['16', 'create-array',       '16. Create array from string',          PART1],
  ['17', 'reverse-arr',        '17. Reverse an array',                  PART1],
  ['18', 'build-list',         '18. Build an array with a given value', PART1],
  ['19', 'fizz-buzz',          '19. FizzBuzz',                          PART1],
  ['20', 'count-occurrence',   '20. Count value in array',              PART1],
  ['21', 'r-map',              '21. Recursive Map',                     PART1],
  ['22', 'count-keys-in-obj',  '22. Count key in object',               PART1],
  ['23', 'count-vals-in-obj',  '23. Count value in object',             PART1],
  ['24', 'replace-keys',       '24. Replace keys in object',            PART1],
  ['25', 'fibonacci',          '25. First n Fibonacci',                 PART1],
  ['26', 'nth-fibo',           '26. Return nth Fibonacci',              PART1],
  ['27', 'capitalize-words',   '27. Capitalize words in array',         PART1],
  ['28', 'capitalize-first',   '28. Capitalize first letter',           PART1],
  ['29', 'nested-even-sum',    '29. Sum even numbers in nested objects',PART1],
  ['30', 'flatten',            '30. Flatten nested arrays',             PART1],
  ['31', 'letter-tally',       '31. Tally letters in string',           PART1],
  ['32', 'compress',           '32. Eliminate consecutive duplicates',  PART1],
  ['33', 'augment-elements',   '33. Augment each element',              PART1],
  ['34', 'minimize-zeroes',    '34. Minimize zeroes',                   PART1],
  ['35', 'alternate-sign',     '35. Alternate sign',                    PART1],
  ['36', 'num-to-text',        '36. Convert numbers to text',           PART1],
  ['37', 'tag-count',          '37. Count Tags',                        PART2],
  ['38', 'binary-search',      '38. Binary Search',                     PART2],
  ['39', 'merge-sort',         '39. Merge Sort',                        PART2],
  ['40', 'clone',              '40. Clone',                             PART2],
];

// ─── Extract a describe() block by title fragment ────────────────────────────
function extractDescribeBlock(source, titleFragment) {
  // Find the opening of describe('<titleFragment>'
  const searchStr = `describe('${titleFragment}`;
  const start = source.indexOf(searchStr);
  if (start === -1) {
    throw new Error(`Could not find describe block: "${titleFragment}"`);
  }

  // Walk forward counting braces to find matching closing brace
  let depth = 0;
  let i = start;
  let foundFirst = false;

  while (i < source.length) {
    const ch = source[i];
    if (ch === '{') { depth++; foundFirst = true; }
    else if (ch === '}') {
      depth--;
      if (foundFirst && depth === 0) {
        // Include the closing ); after the brace
        let end = i + 1;
        // consume optional ); or );
        const tail = source.slice(end, end + 3);
        if (tail.startsWith(');')) end += 2;
        else if (tail.startsWith(')')) end += 1;
        return source.slice(start, end);
      }
    }
    i++;
  }
  throw new Error(`Could not find end of describe block: "${titleFragment}"`);
}

// ─── Extract stub(s) from recursion.js for a given problem number ────────────
// Strategy: split on blank lines between problems, match by problem number comment
function extractStub(problemNum) {
  const numStr = parseInt(problemNum, 10).toString();

  // Split file into chunks separated by double-newlines between problem blocks
  // We look for the comment "// N." that starts each problem
  const lines = RECURSION.split('\n');

  // Find start line: a comment starting with `// N.` or `// NN.`
  const startPattern = new RegExp(`^\\s*\\/\\/ ${numStr}\\.`);
  let startLine = -1;
  for (let i = 0; i < lines.length; i++) {
    if (startPattern.test(lines[i])) {
      startLine = i;
      break;
    }
  }
  if (startLine === -1) throw new Error(`Could not find stub for problem ${numStr}`);

  // Find end: the next problem comment or end of file
  const nextNum = parseInt(numStr, 10) + 1;
  const endPattern = new RegExp(`^\\s*\\/\\/ ${nextNum}\\.`);
  // Also handle "// *** EXTRA CREDIT ***"
  const extraCreditPattern = /^\s*\/\/ \*\*\* EXTRA CREDIT/;

  let endLine = lines.length;
  for (let i = startLine + 1; i < lines.length; i++) {
    if (endPattern.test(lines[i]) || extraCreditPattern.test(lines[i])) {
      endLine = i;
      break;
    }
  }

  // Trim trailing blank lines
  while (endLine > startLine && lines[endLine - 1].trim() === '') endLine--;

  return lines.slice(startLine, endLine).join('\n');
}

// ─── Build spec.js content ────────────────────────────────────────────────────
function buildSpecContent(describeBlock) {
  return `/* jshint esversion: 6 */

(function() {
  'use strict';

${describeBlock}

}());
`;
}

// ─── Build problem.js content ─────────────────────────────────────────────────
function buildProblemContent(stub) {
  return `/* jshint esversion: 6 */

// Solve the following prompt using recursion.

${stub}
`;
}

// ─── Main ────────────────────────────────────────────────────────────────────
const problemsDir = path.join(ROOT, 'problems');
if (!fs.existsSync(problemsDir)) fs.mkdirSync(problemsDir);

const manifest = []; // for index.html to know all problems

for (const [num, slug, titleFragment, specSource] of PROBLEMS) {
  const dirName  = `${num}-${slug}`;
  const dir      = path.join(problemsDir, dirName);

  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  // Extract and write spec.js
  let describeBlock;
  try {
    describeBlock = extractDescribeBlock(specSource, titleFragment);
  } catch (e) {
    console.error(`[WARN] ${titleFragment}: ${e.message}`);
    describeBlock = `describe('${titleFragment}', function() { /* TODO */ });`;
  }
  fs.writeFileSync(path.join(dir, 'spec.js'), buildSpecContent(describeBlock));

  // Extract and write problem.js
  let stub;
  try {
    stub = extractStub(num);
  } catch (e) {
    console.error(`[WARN] problem ${num}: ${e.message}`);
    stub = `// Problem ${num}\nvar fn = function() {};`;
  }
  fs.writeFileSync(path.join(dir, 'problem.js'), buildProblemContent(stub));

  // Derive human-readable title from titleFragment
  const title = titleFragment.replace(/^\d+\.\s*/, '');
  manifest.push({ num: parseInt(num, 10), slug, title, dir: dirName });

  console.log(`✓ ${dirName}`);
}

// Write manifest JSON so index.html can discover all problems
fs.writeFileSync(
  path.join(ROOT, 'problems', 'manifest.json'),
  JSON.stringify(manifest, null, 2)
);

console.log(`\n✅ Generated ${manifest.length} problem folders in problems/`);
console.log('   Manifest written to problems/manifest.json');
