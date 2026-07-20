import { Analytics } from './analytics.js';
import { AppController } from './app-controller.js';
import { AppStore } from './app-store.js';
import { EditorView } from './editor-view.js';
import { HeaderView } from './header-view.js';
import { OverlayView } from './overlay-view.js';
import { ProblemService } from './problem-service.js';
import { ResultsView } from './results-view.js';
import { SidebarView } from './sidebar-view.js';
import { TestRunner } from './test-runner.js';

const controller = new AppController({
  store: new AppStore(),
  problemService: new ProblemService(),
  testRunner: new TestRunner(document.getElementById('test-frame')),
  analytics: new Analytics(),
  headerView: new HeaderView({
    prevBtn: document.getElementById('prev-btn'),
    nextBtn: document.getElementById('next-btn'),
    runBtn: document.getElementById('run-btn'),
    currentNum: document.getElementById('current-num'),
    totalNum: document.getElementById('total-num'),
  }),
  sidebarView: new SidebarView({
    sidebarList: document.getElementById('sidebar-list'),
    searchInput: document.getElementById('search-input'),
  }),
  editorView: new EditorView({
    problemTitle: document.getElementById('problem-title'),
    partTag: document.getElementById('problem-part-tag'),
    codeEditor: document.getElementById('code-editor'),
    resetBtn: document.getElementById('reset-btn'),
  }),
  resultsView: new ResultsView({
    resultsBody: document.getElementById('results-body'),
    progressBar: document.getElementById('progress-bar'),
    statPass: document.getElementById('stat-pass'),
    statFail: document.getElementById('stat-fail'),
    statTotal: document.getElementById('stat-total'),
  }),
  overlayView: new OverlayView({
    overlay: document.getElementById('loading-overlay'),
    loaderText: document.querySelector('.loader-text'),
  }),
});

controller.init();