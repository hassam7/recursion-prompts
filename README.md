# Recursion Prompts

### What is this?
An interactive browser-based playground for practising recursion in JavaScript. There are **40 challenges** — each one has a problem prompt, a starter stub, and a full test suite. Write your solution in the editor, click **Run Tests**, and see pass/fail results in real time.

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
2. Browse all 40 problems in the left sidebar (or use the search bar).
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
├── index.html            ← Playground entry point (open this at localhost:3000)
├── server.js             ← Zero-dependency Node.js static file server
├── problems/             ← One folder per problem (auto-generated)
│   ├── manifest.json     ← Problem index used by the UI
│   ├── 01-factorial/
│   │   ├── problem.js    ← Starter stub shown in the editor
│   │   └── spec.js       ← Isolated test suite for this problem
│   └── …  (40 folders total)
├── src/
│   └── recursion.js      ← Original source with all function stubs
├── spec/
│   ├── part1.js          ← Full test suite for problems 1–36
│   └── part2.js          ← Full test suite for problems 37–40
├── lib/                  ← Test libraries (Mocha, Chai, Sinon, jQuery)
├── scripts/
│   └── generate-problems.js  ← Regenerate the problems/ folder from source
└── SpecRunner.html       ← Original Mocha HTML runner (still works)
```

---

### Regenerating Problem Files

The `problems/` folder is generated from `src/recursion.js` and `spec/part1.js` / `spec/part2.js`. If you modify the source or specs you can regenerate:

```bash
node scripts/generate-problems.js
```

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
