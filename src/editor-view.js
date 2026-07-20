const ACE_BASE_URL = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.43.3';
const ACE_SCRIPTS = [
  `${ACE_BASE_URL}/ace.min.js`,
  `${ACE_BASE_URL}/mode-javascript.min.js`,
  `${ACE_BASE_URL}/theme-tomorrow_night.min.js`,
];

let aceLoadPromise;

export class EditorView {
  constructor({ problemTitle, partTag, codeEditor, resetBtn }) {
    this.problemTitle = problemTitle;
    this.partTag = partTag;
    this.codeEditor = codeEditor;
    this.resetBtn = resetBtn;
    this.editor = null;
    this.pendingCode = '';
    this.runShortcutHandler = null;
  }

  async init() {
    await loadAce();
    this.editor = this.createEditor(this.codeEditor);
    this.setCode(this.pendingCode);

    if (this.runShortcutHandler) {
      this.addRunShortcut(this.runShortcutHandler);
    }
  }

  renderProblem(problem, code) {
    this.problemTitle.textContent = `${problem.num}. ${problem.title}`;
    this.partTag.textContent = problem.num <= 36 ? 'Part 1' : 'Part 2';
    this.setCode(code);
  }

  getCode() {
    if (!this.editor) {
      return this.pendingCode;
    }

    return this.editor.getValue();
  }

  setCode(code) {
    this.pendingCode = code || '';

    if (!this.editor) {
      return;
    }

    this.editor.setValue(this.pendingCode, -1);
    this.editor.focus();
  }

  bindReset(handler) {
    this.resetBtn.addEventListener('click', handler);
  }

  bindRunShortcut(handler) {
    this.runShortcutHandler = handler;

    if (!this.editor) {
      return;
    }

    this.addRunShortcut(handler);
  }

  addRunShortcut(handler) {
    this.editor.commands.addCommand({
      name: 'runTests',
      bindKey: { win: 'Ctrl-Enter', mac: 'Command-Enter' },
      exec: handler,
    });
  }

  createEditor(element) {
    const editor = window.ace.edit(element);

    editor.setTheme('ace/theme/tomorrow_night');
    editor.session.setMode('ace/mode/javascript');
    editor.session.setUseWorker(false);
    editor.session.setTabSize(2);
    editor.session.setUseSoftTabs(true);
    editor.setOptions({
      fontFamily: 'JetBrains Mono, Fira Code, monospace',
      fontSize: '13.5px',
      showPrintMargin: false,
      highlightActiveLine: true,
      highlightSelectedWord: true,
      displayIndentGuides: true,
      useWorker: false,
      wrap: false,
    });

    editor.renderer.setPadding(14);
    editor.renderer.setScrollMargin(12, 12, 0, 0);
    editor.renderer.setShowGutter(true);

    return editor;
  }
}


function loadAce() {
  if (window.ace) {
    return Promise.resolve();
  }

  if (!aceLoadPromise) {
    aceLoadPromise = ACE_SCRIPTS.reduce(
      (promise, src) => promise.then(() => loadScript(src)),
      Promise.resolve(),
    );
  }

  return aceLoadPromise;
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', resolve, { once: true });
      existingScript.addEventListener('error', reject, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    script.crossOrigin = 'anonymous';
    script.referrerPolicy = 'no-referrer';
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Could not load ${src}`));
    document.head.appendChild(script);
  });
}