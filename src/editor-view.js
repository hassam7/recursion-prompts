export class EditorView {
  constructor({ problemTitle, partTag, codeEditor, resetBtn }) {
    this.problemTitle = problemTitle;
    this.partTag = partTag;
    this.codeEditor = codeEditor;
    this.resetBtn = resetBtn;
    this.editor = this.createEditor(codeEditor);
  }

  renderProblem(problem, code) {
    this.problemTitle.textContent = `${problem.num}. ${problem.title}`;
    this.partTag.textContent = problem.num <= 36 ? 'Part 1' : 'Part 2';
    this.setCode(code);
  }

  getCode() {
    return this.editor.getValue();
  }

  setCode(code) {
    this.editor.setValue(code || '', -1);
    this.editor.focus();
  }

  bindReset(handler) {
    this.resetBtn.addEventListener('click', handler);
  }

  bindRunShortcut(handler) {
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
      enableBasicAutocompletion: false,
      enableLiveAutocompletion: false,
      enableSnippets: false,
      useWorker: false,
      wrap: false,
    });

    editor.renderer.setPadding(14);
    editor.renderer.setScrollMargin(12, 12, 0, 0);
    editor.renderer.setShowGutter(true);

    return editor;
  }
}