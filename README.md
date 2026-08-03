# Recursion Prompts

### What is this?
An SEO-friendly static site and interactive playground for practising recursion in JavaScript. There are **52 challenges**; each one has a crawlable problem page, a starter stub, and a full browser-based test suite.

---

### Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/hassam7/recursion-prompts.git
cd recursion-prompts

# 2. Install dependencies
npm install

# 3. Start Astro
npm run dev

# 4. Open the site
#    http://localhost:4321
```

Production build:

```bash
npm run build
npm run preview
```

---

### How to use the Playground

1. Open **http://localhost:4321/playground/** in your browser.
2. Browse all 52 problems in the left sidebar, or use search.
3. Use **Prev** / **Next** buttons, or the sidebar, to jump between problems.
4. Write or modify your recursive solution in the editor.
5. Click **Run Tests**, or press **Ctrl/Cmd + Enter**, to run the test suite.
6. Review pass/fail output in the right panel.
7. Click **Reset to stub** to restore the starter code for the current problem.

Each challenge also has a static page such as `/problems/factorial/`. Those pages are designed for search engines, sharing, and reading the prompt without loading the interactive playground.

---

### A few guidelines

- Please refrain from sharing solutions. Instead, give a question that encourages thinking differently.

    > **Q:** Why does my function keep exceeding the call stack?

    > **A:** What's your base case?

- Don't be afraid to pseudocode your algorithm before writing actual code.

    > Pseudocode helps you focus on the algorithm instead of getting distracted by syntax.

- This repo requires each function call itself recursively and pays no attention to whether inner recursive functions are defined and called.

    > While both are valid uses of recursion, there are important lessons to learn by following the method this repo enforces. Defining inner functions and calling them recursively relies on side effects, while following the more pure approach requires an understanding of how values are passed through the call stack.

- This repo restricts expanding the number of parameters a function accepts.

    > Expanding the number of parameters is a valid approach, but has been restricted here to emphasize certain lessons while learning recursion.

- An attempt was made to order prompts by difficulty, but they don't have to be solved in any particular order.
- Feel free to make pull requests or open issues regarding bugs or suggestions.

---

### Project Structure

```text
recursion-prompts/
├── astro.config.mjs            Astro configuration with React integration
├── package.json                Astro scripts and React dependencies
├── public/
│   ├── lib/                    Browser test dependencies copied as static files
│   │   └── css/mocha.css       Mocha styles injected only into the test iframe
│   ├── problems/               Generated runtime copy of challenge data
│   └── robots.txt              Search crawler policy
├── src/
│   ├── components/playground/  React playground components and CSS modules
│   ├── layouts/BaseLayout.astro
│   ├── lib/problem-content.js  Build-time problem metadata and description helpers
│   ├── pages/index.astro       SEO-friendly homepage
│   ├── pages/playground.astro  React playground route
│   ├── pages/problems/[slug].astro
│   ├── pages/sitemap.xml.js
│   ├── playground/             Runtime services for tests, data, and analytics
│   └── styles/site.css         Static site styles
├── problems/                   Editable challenge source files
├── scripts/sync-public-problems.mjs
├── lib/                        Original checked-in test dependency files
└── README.md
```

Astro builds the deployable static site into `dist/`.

---

### Application Architecture

The site uses **Astro for static HTML** and **React only for the interactive playground**.

- `/` is a static homepage with crawlable links to every challenge.
- `/problems/[slug]/` is a fully static SEO page for each challenge.
- `/playground/` mounts the React app and loads the editor/test runner.
- `/sitemap.xml` is generated from the manifest.
- `/lib/*` and `/problems/*` are served from `public/` so the test runner can fetch them directly.

Static problem pages do not load the React playground bundle. That keeps prompt pages fast and gives search engines real HTML for the challenge titles, descriptions, prompts, and internal links.

#### React Playground

The playground is implemented as a React island in `src/components/playground/PlaygroundApp.jsx`.

The old controller/view split has been replaced with React components:

- `Header.jsx`: navigation and run controls
- `Sidebar.jsx`: problem search and selection
- `EditorPanel.jsx`: React textarea editor and reset behavior
- `ResultsPanel.jsx`: pass/fail rendering
- `src/playground/problemService.js`: manifest, stubs, specs, and library fetches
- `src/playground/testRunner.js`: sandboxed iframe test execution
- `src/playground/analytics.js`: analytics event wrapper

The editor is intentionally a lightweight React textarea rather than a bundled code editor. This keeps the playground bundle smaller and avoids loading editor JavaScript on SEO pages.

#### Test Libraries

Chai, Mocha, Sinon, jQuery, and `testSupport.js` are **not bundled** by Astro or Vite. They stay as static browser files under `public/lib/` and are fetched as text by the test runner in this order:

```text
jquery.js
chai.js
mocha.js
sinon.js
testSupport.js
```

The iframe still receives Mocha CSS from `public/lib/css/mocha.css`. Keep those files and their load order stable when changing the test runner.

#### Problem Data

The editable challenge source lives in `problems/`. Each challenge owns its metadata, description, starter stub, and tests inside its numbered folder:

```text
problems/01-factorial/
├── meta.json
├── description.html
├── problem.js
└── spec.js
```

`meta.json` contains human-readable metadata:

```json
{
  "title": "Factorial"
}
```

`description.html` contains the crawlable prompt content used by static problem pages. `problem.js` should contain only the starter code, not the prompt description.

Before Astro dev/build runs, `npm run sync:problems` copies `problems/` to `public/problems/` and generates `public/problems/manifest.json` from the problem folders. The browser can then fetch runtime data from stable static URLs:

```text
/problems/manifest.json
/problems/01-factorial/problem.js
/problems/01-factorial/spec.js
```

Astro also reads the source `problems/` folder at build time to generate static problem pages and the sitemap. The generated manifest is derived from folder names and each folder's `meta.json`:

```json
{
  "num": 1,
  "slug": "factorial",
  "title": "Factorial",
  "dir": "01-factorial"
}
```

If you change a challenge, edit only `problems/`. The `public/problems/` copy, including its generated manifest, is ignored by git.

#### Adding a New Problem

1. Create the next numbered folder under `problems/` using the existing naming pattern:

```text
problems/53-new-problem-slug/
├── meta.json
├── description.html
├── problem.js
└── spec.js
```

2. Add the human-readable title to `meta.json`:

```json
{
  "title": "New Problem Title"
}
```

3. Add the prompt content to `description.html`. Use regular HTML such as paragraphs, lists, and inline `code` elements.

4. Add only the starter function stub to `problem.js`.

5. Add the Mocha/Chai test suite to `spec.js`. Keep the test file browser-compatible because it runs inside the sandboxed iframe with the static libraries from `public/lib/`.

6. Run the sync script if you want to test the new problem without starting Astro through npm scripts:

```bash
npm run sync:problems
```

`npm run dev` and `npm run build` run this sync automatically through `predev` and `prebuild`.

7. Validate the new challenge:

```bash
npm run build
```

Then check these routes locally with `npm run preview`:

```text
/problems/new-problem-slug/
/playground/?problem=53
/sitemap.xml
```

8. Commit the source files in `problems/` and any docs updates. Do not commit `public/problems/`; it is generated.

---

### CSS Architecture

Static site styles live in `src/styles/site.css` and apply to Astro-rendered pages such as the homepage and problem pages.

The playground uses CSS Modules colocated with React components:

```text
src/components/playground/Header.module.css
src/components/playground/Sidebar.module.css
src/components/playground/EditorPanel.module.css
src/components/playground/ResultsPanel.module.css
src/components/playground/PlaygroundApp.module.css
```

This keeps playground styles scoped to their components and avoids the old global view CSS cascade. Mocha styling is the exception: `public/lib/css/mocha.css` remains a static third-party stylesheet injected into the iframe.

---

### What is recursion?
> Recursion is when a function calls itself until it doesn't. --not helpful person

Is it a true definition? Mostly. Recursion is when a function calls itself. A recursive function can call itself forever, but that's generally not preferred. It's often a good idea to include a condition in the function definition that allows it to stop calling itself. This condition is referred to as a **_base_** case. As a general rule, recursion shouldn't be utilized without an accompanying base case unless an infinite operation is desired. This leaves us with two fundamental conditions every recursive function should include:

- A **`base`** case
- A **`recursive`** case

_What does this all mean?_ Let's consider a small example:

```javascript
function stepsToZero(n) {
  if (n === 0) {
    return 'Reached zero';
  }

  console.log(n + ' is not zero');
  return stepsToZero(n - 1);
}
```

### Why use recursion?
Recursion can be elegant, but it can also be dangerous. In some cases, recursion feels like a more natural and readable solution; in others, it ends up being contrived. In most cases, recursion can be avoided entirely and sometimes should in order to minimize the possibility of exceeding the call stack and crashing your app. But keep in mind that code readability is important. If a recursive solution reads more naturally, then it may be the best solution for the given problem.

Recursion isn't unique to any one programming language. As a software engineer, you will encounter recursion and it's important to understand what's happening and how to work with it. Recursion is often used when the depth of a thing is unknown or every element of a thing needs to be touched.
