export class HeaderView {
  constructor({ prevBtn, nextBtn, runBtn, currentNum, totalNum }) {
    this.prevBtn = prevBtn;
    this.nextBtn = nextBtn;
    this.runBtn = runBtn;
    this.currentNum = currentNum;
    this.totalNum = totalNum;
  }

  render({ currentProblem, totalProblems, isRunning, hasPrevious, hasNext }) {
    this.currentNum.textContent = currentProblem ? currentProblem.num : '1';
    this.totalNum.textContent = totalProblems;
    this.prevBtn.disabled = isRunning || !hasPrevious;
    this.nextBtn.disabled = isRunning || !hasNext;
    this.runBtn.classList.toggle('loading', isRunning);
  }

  bindPrevious(handler) {
    this.prevBtn.addEventListener('click', handler);
  }

  bindNext(handler) {
    this.nextBtn.addEventListener('click', handler);
  }

  bindRun(handler) {
    this.runBtn.addEventListener('click', handler);
  }
}