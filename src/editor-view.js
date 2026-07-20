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
    this.fallbackEditor = this.createFallbackEditor(codeEditor);
    this.runShortcutHandler = null;
  }

  async init() {
    await loadAce();
    const code = this.getCode();
    this.removeFallbackEditor();
    this.editor = this.createEditor(this.codeEditor);
    this.setCode(code);

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
      if (this.fallbackEditor) {
        return this.fallbackEditor.value;
      }

      return this.pendingCode;
    }

    return this.editor.getValue();
  }

  setCode(code) {
    this.pendingCode = code || '';

    if (!this.editor) {
      if (this.fallbackEditor) {
        this.fallbackEditor.value = this.pendingCode;
      }

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
      this.addFallbackRunShortcut(handler);
      return;
    }

    this.addRunShortcut(handler);
  }

  createFallbackEditor(element) {
    const fallbackEditor = document.createElement('textarea');
    fallbackEditor.className = 'code-editor-fallback';
    fallbackEditor.spellcheck = false;
    fallbackEditor.autocorrect = 'off';
    fallbackEditor.autocapitalize = 'off';
    fallbackEditor.addEventListener('input', () => {
      this.pendingCode = fallbackEditor.value;
    });
    element.appendChild(fallbackEditor);

    return fallbackEditor;
  }

  removeFallbackEditor() {
    if (!this.fallbackEditor) {
      return;
    }

    this.fallbackEditor.remove();
    this.fallbackEditor = null;
  }

  addFallbackRunShortcut(handler) {
    if (!this.fallbackEditor) {
      return;
    }

    this.fallbackEditor.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const start = this.fallbackEditor.selectionStart;
        const end = this.fallbackEditor.selectionEnd;
        this.fallbackEditor.value = `${this.fallbackEditor.value.slice(0, start)}  ${this.fallbackEditor.value.slice(end)}`;
        this.fallbackEditor.selectionStart = start + 2;
        this.fallbackEditor.selectionEnd = start + 2;
        this.pendingCode = this.fallbackEditor.value;
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handler();
      }
    });
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