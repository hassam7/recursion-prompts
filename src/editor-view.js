export class EditorView {
  constructor({ problemTitle, partTag, codeEditor, resetBtn }) {
    this.problemTitle = problemTitle;
    this.partTag = partTag;
    this.codeEditor = codeEditor;
    this.resetBtn = resetBtn;
  }

  renderProblem(problem, code) {
    this.problemTitle.textContent = `${problem.num}. ${problem.title}`;
    this.partTag.textContent = problem.num <= 36 ? 'Part 1' : 'Part 2';
    this.codeEditor.value = code;
  }

  getCode() {
    return this.codeEditor.value;
  }

  setCode(code) {
    this.codeEditor.value = code;
  }

  bindReset(handler) {
    this.resetBtn.addEventListener('click', handler);
  }

  bindRunShortcut(handler) {
    this.codeEditor.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        event.preventDefault();
        const start = this.codeEditor.selectionStart;
        const end = this.codeEditor.selectionEnd;
        const nextValue = this.codeEditor.value.slice(0, start) + '  ' + this.codeEditor.value.slice(end);
        this.codeEditor.value = nextValue;
        this.codeEditor.selectionStart = start + 2;
        this.codeEditor.selectionEnd = start + 2;
        return;
      }

      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handler();
      }
    });
  }
}