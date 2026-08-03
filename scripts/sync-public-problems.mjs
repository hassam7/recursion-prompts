import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const sourceDir = path.join(root, 'problems');
const targetDir = path.join(root, 'public', 'problems');

await fs.rm(targetDir, { recursive: true, force: true });
await fs.mkdir(path.dirname(targetDir), { recursive: true });
await fs.cp(sourceDir, targetDir, { recursive: true });

console.log(`Synced ${path.relative(root, sourceDir)} -> ${path.relative(root, targetDir)}`);