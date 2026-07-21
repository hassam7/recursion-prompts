# Recursion Prompts

### What is this?
An interactive browser-based playground for practising recursion in JavaScript. There are **50 challenges** — each one has a problem prompt, a starter stub, and a full test suite. Write your solution in the editor, click **Run Tests**, and see pass/fail results in real time.

---

### Quick Start

```bash
# 1. Clone the repo
git clone https://github.com/hassam7/recursion-prompts.git
cd recursion-prompts

# 2. Start the server (uses only Node.js stdlib — no npm install needed)
node server.js

# 3. Open in your browser
#    http://localhost:3000
```

---

### How to use the Playground

1. Open **http://localhost:3000** in your browser.
2. Browse all 50 problems in the left sidebar (or use the search bar).
3. Use **← Prev** / **Next →** buttons (or the sidebar) to jump between problems.
4. Read the prompt at the top of the editor panel.
5. Write (or modify) your recursive solution in the code editor.
6. Click **▶ Run Tests** (or press **Ctrl/Cmd + Enter**) to run the test suite.
7. Review results in the right panel — each test shows pass ✅ or fail ❌ with an error message.
8. Your edits are preserved while navigating between problems in the same session.
9. Click **↺ Reset to stub** to restore the original starter code for any problem.

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
- **`Watch`**, **`Star`**, and **`Fork`** this repo. You know you want to.

---

### Project Structure

```
recursion-prompts/
├── index.html              ← App shell and static DOM structure
├── server.js               ← Zero-dependency Node.js static file server
├── package.json            ← npm scripts; currently only starts the server
├── lib/                    ← Browser test dependencies: Mocha, Chai, Sinon, jQuery
│   └── css/mocha.css       ← Mocha styles injected into the test iframe
├── problems/               ← One folder per challenge
│   ├── manifest.json       ← Problem index used by the UI
│   ├── 01-factorial/
│   │   ├── problem.js      ← Starter stub shown in the editor
│   │   └── spec.js         ← Isolated test suite for this problem
│   └── ...                 ← 50 folders total
├── src/
│   ├── main.js             ← Composition root; wires services, state, and views
│   ├── app-controller.js   ← Coordinates app startup, navigation, reset, and tests
│   ├── app-store.js        ← In-memory state for manifest, code, results, and filters
│   ├── problem-service.js  ← Fetches manifest, stubs, specs, and test libraries
│   ├── test-runner.js      ← Runs user code and specs inside a sandboxed iframe
│   ├── analytics.js        ← Small wrapper around analytics events
│   ├── *-view.js           ← DOM view adapters for header/sidebar/editor/results/overlay
│   └── *-view.css          ← Component styles matching the corresponding view modules
└── README.md
```

---

### Application Architecture

The app is a build-free browser application. There is no bundler, transpiler, or framework runtime. `server.js` serves static files, and the browser loads native ES modules directly from `src/`.

#### HTML

`index.html` is the static app shell. It owns the document metadata, Google Fonts, analytics snippet, stylesheet links, and the root DOM regions used by the JavaScript views.

The main layout is split into these landmarks:

- `header`: navigation controls, problem counter, run button, and the small-screen problems menu button
- `.sidebar`: problem list and search input
- `.editor-panel`: problem title, metadata, reset control, and code editor host
- `.results-panel`: progress, pass/fail counts, and test result output
- `#loading-overlay`: startup loading state
- `#test-frame`: hidden iframe used to run tests safely away from the main UI

The HTML intentionally stays mostly declarative. Dynamic lists, editor content, test output, loading state, and button behavior are handled by view classes in JavaScript.

#### JavaScript

`src/main.js` is the composition root. It creates the store, services, runner, analytics object, view objects, and the `AppController`, then calls `controller.init()`.

The controller is the main coordinator:

- `AppController` binds UI events and decides what happens when users navigate, search, reset, or run tests.
- `AppStore` keeps all runtime state in memory: current problem, cached stubs, user edits, test results, search filter, and running status.
- `ProblemService` fetches static problem data from `problems/` and test dependencies from `lib/`.
- `TestRunner` builds an iframe document containing the user code, the problem spec, and the test libraries. It listens for posted Mocha results and returns them to the controller.
- View classes such as `HeaderView`, `SidebarView`, `EditorView`, `ResultsView`, and `OverlayView` are thin DOM adapters. They render UI and expose event-binding methods, but they do not own application decisions.

The editor uses Ace, but Ace is loaded lazily. `EditorView` creates a plain textarea fallback immediately, starts loading Ace in parallel with app startup, and then swaps the textarea for Ace when the library finishes loading. This keeps the app usable even when the Ace CDN is slow.

#### Data and Test Flow

Startup flow:

1. `main.js` creates the app objects.
2. `AppController.init()` binds events.
3. `EditorView.init()` starts loading Ace in the background.
4. `ProblemService` loads `problems/manifest.json` and prefetches test libraries.
5. The controller renders the header/sidebar and opens the initial problem from the URL.
6. The loading overlay is hidden after the first problem is ready, without waiting for Ace.

Test run flow:

1. The user clicks `Run Tests` or presses `Ctrl/Cmd + Enter`.
2. `AppController.runTests()` reads code from `EditorView.getCode()`.
3. The current problem spec and Mocha CSS are fetched.
4. `TestRunner` injects the user code, spec, and libraries into the hidden iframe.
5. The iframe posts test results back to the main page.
6. `ResultsView` renders the pass/fail summary and individual test rows.

---

### CSS Architecture

CSS lives in `src/` and is named to match the JavaScript view or app area it supports:

- `app.css`: reset, design tokens, global layout, shared keyframes, scrollbar styling, and app-wide responsive grid rules
- `header-view.css`: header, navigation, run button, and hamburger menu styling
- `sidebar-view.css`: problem drawer, search input, problem list rows, active state, and status dots
- `editor-view.css`: problem prompt area, editor toolbar, Ace editor styling, and textarea fallback styling
- `results-view.css`: test results header, progress bar, result rows, errors, and summary boxes
- `overlay-view.css`: startup loading overlay

The CSS files are linked in `index.html` in dependency order: shared app styles first, then component styles. This mirrors the JavaScript structure and makes ownership easier to find: when changing `ResultsView`, start with `results-view.js` and `results-view.css`.

#### Cascade Layers

The styles use CSS cascade layers with `@layer`:

```css
@layer reset, tokens, layout, components, responsive;
```

Layers give the cascade an explicit order. This makes stylesheet order less fragile and avoids relying only on selector specificity.

The layers are used like this:

- `reset`: universal box model and margin reset
- `tokens`: CSS custom properties such as colors, spacing radii, and transition timing
- `layout`: global document and app grid layout
- `components`: component-level rules for header, sidebar, editor, results, overlay, and animations
- `responsive`: media queries that adapt the layout for tablets and small screens

A rule in a later layer wins over a rule in an earlier layer when specificity is otherwise comparable. For example, responsive rules can override component layout without needing overly specific selectors.

#### CSS Custom Properties

Design values live in `:root` as custom properties:

```css
:root {
  --bg: #0b0d14;
  --surface: #13151f;
  --accent: #7c6fef;
  --text: #e2e8f0;
  --radius-sm: 8px;
}
```

Using tokens keeps colors and shared values consistent across components. If the theme changes later, most visual updates should happen in `app.css` rather than across every component file.

#### Grid Layout

The desktop shell uses CSS Grid:

```css
.app {
  grid-template-areas:
    "header header header"
    "sidebar editor results";
}
```

This maps directly to the HTML regions and keeps the main app layout readable. On smaller screens, the grid changes to a single column:

```css
grid-template-areas:
  "header"
  "editor"
  "results";
```

The problems list becomes a fixed-position drawer opened by the hamburger button, while the editor and test output stack vertically.

#### Responsive Rules

Responsive CSS is grouped by responsibility:

- `app.css` changes the global grid and document scrolling.
- `header-view.css` wraps the header and shows the hamburger button.
- `sidebar-view.css` turns the problem list into a drawer and backdrop.
- `editor-view.css` and `results-view.css` define minimum panel heights for stacked layouts.

This keeps each file responsible for its own component behavior while still allowing the whole app to adapt together.

#### Fallback and Third-Party Styling

`EditorView` creates a `.code-editor-fallback` textarea while Ace is loading. `editor-view.css` styles that fallback to occupy the same space as the Ace editor, so users can type immediately.

Ace injects its own DOM and class names, so `editor-view.css` also includes targeted rules for classes like `.ace_editor`, `.ace_gutter`, and `.ace_cursor`. A few Ace rules use `!important` because Ace themes also write strong editor styles; the overrides are intentionally scoped to Ace-specific classes.

---

### Regenerating Problem Files

The current playground reads directly from the checked-in `problems/` folders. If you change a challenge, update the relevant `problem.js`, `spec.js`, and `manifest.json` entry together.

Older versions of this repository generated `problems/` from larger source/spec files. If you bring that generator back, keep generated files and the manifest in sync before opening a pull request.

---

### What is recursion?
> Recursion is when a function calls itself until it doesn't. --not helpful person

Is it a true definition? Mostly. Recursion is when a function calls itself. A recursive function can call itself forever, but that's generally not preferred. It's often a good idea to include a condition in the function definition that allows it to stop calling itself. This condition is referred to as a **_base_** case. As a general rule, recursion shouldn't be utilized without an accompanying base case unless an infinite operation is desired. This leaves us with two fundamental conditions every recursive function should include:
- A **`base`** case
- A **`recursive`** case

_What does this all mean?_ Let's consider a silly example:
```javascript
function stepsToZero(n) {
  if (n === 0) { /* base case */
    return 'Reached zero';
  } else { /* recursive case */
    console.log(n + ' is not zero');
    return stepsToZero(n-1);
  }
}
```

### Why use recursion?
Recursion can be elegant, but it can also be dangerous. In some cases, recursion feels like a more natural and readable solution; in others, it ends up being contrived. In most cases, recursion can be avoided entirely and sometimes should in order to minimize the possibility of exceeding the call stack and crashing your app. But keep in mind that code readability is important. If a recursive solution reads more naturally, then it may be the best solution for the given problem.

Recursion isn't unique to any one programming language. As a software engineer, you _will_ encounter recursion and it's important to understand what's happening and how to work with it. It's also important to understand why someone might use it. Recursion is often used when the depth of a thing is unknown or every element of a thing needs to be touched. For example, you might use recursion if you want to find all DOM elements with a specific class name. You may not know how deep the DOM goes and need to touch every element so that none are missed.

### Divide and Conquer
Recursion is often used in _divide and conquer_ algorithms where problems can be divided into similar subproblems and conquered individually. Consider traversing a tree structure. Each branch may have its own "children" branches. Every branch is essentially just another tree which means, as long as child trees are found, we can recurse on each child.

[inception]: <https://en.wikipedia.org/wiki/Inception>
