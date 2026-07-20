export class SidebarView {
  constructor({ sidebar, sidebarList, searchInput, menuBtn, backdrop }) {
    this.sidebar = sidebar;
    this.sidebarList = sidebarList;
    this.searchInput = searchInput;
    this.menuBtn = menuBtn;
    this.backdrop = backdrop;
    this.selectHandler = null;

    this.bindMenu();
  }

  render({ manifest, currentProblemNumber, resultCache, filter }) {
    const lowerFilter = filter.toLowerCase();
    this.sidebarList.innerHTML = '';

    manifest.forEach((problem) => {
      const label = `${problem.num}. ${problem.title}`;
      if (lowerFilter && !label.toLowerCase().includes(lowerFilter)) {
        return;
      }

      const item = document.createElement('div');
      item.className = 'problem-item' + (problem.num === currentProblemNumber ? ' active' : '');

      const numEl = document.createElement('div');
      numEl.className = 'problem-num';
      numEl.textContent = String(problem.num).padStart(2, '0');

      const nameEl = document.createElement('div');
      nameEl.className = 'problem-name';
      nameEl.textContent = problem.title;

      const dot = document.createElement('div');
      dot.className = 'problem-status';
      const cachedResult = resultCache.get(problem.num);
      if (cachedResult) {
        dot.classList.add(cachedResult.stats.failures === 0 ? 'pass' : 'fail');
      }

      item.append(numEl, nameEl, dot);
      item.addEventListener('click', () => {
        if (this.selectHandler) {
          this.selectHandler(problem.num);
        }

        this.closeMenu();
      });

      this.sidebarList.appendChild(item);
    });

    const activeItem = this.sidebarList.querySelector('.problem-item.active');
    if (activeItem) {
      activeItem.scrollIntoView({ block: 'nearest' });
    }
  }

  bindSearch(handler) {
    this.searchInput.addEventListener('input', handler);
  }

  bindSelect(handler) {
    this.selectHandler = handler;
  }

  getFilter() {
    return this.searchInput.value;
  }

  bindMenu() {
    this.menuBtn.addEventListener('click', () => {
      this.toggleMenu();
    });

    this.backdrop.addEventListener('click', () => {
      this.closeMenu();
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    const isOpen = this.sidebar.classList.toggle('open');
    this.backdrop.classList.toggle('visible', isOpen);
    this.menuBtn.setAttribute('aria-expanded', String(isOpen));
  }

  closeMenu() {
    this.sidebar.classList.remove('open');
    this.backdrop.classList.remove('visible');
    this.menuBtn.setAttribute('aria-expanded', 'false');
  }
}