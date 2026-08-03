import fs from 'node:fs/promises';
import path from 'node:path';
import { getProblems } from '../src/lib/problem-content.js';

const root = process.cwd();
const sourceDir = path.join(root, 'problems');
const targetDir = path.join(root, 'public', 'problems');
const manifestPath = path.join(targetDir, 'manifest.json');

await fs.rm(targetDir, { recursive: true, force: true });
await fs.mkdir(path.dirname(targetDir), { recursive: true });
await fs.cp(sourceDir, targetDir, { recursive: true });
await fs.writeFile(manifestPath, `${JSON.stringify(await getProblems(), null, 2)}\n`);

console.log(`Synced ${path.relative(root, sourceDir)} -> ${path.relative(root, targetDir)} and generated manifest.json`);