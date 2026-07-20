export class OverlayView {
  constructor({ overlay, loaderText }) {
    this.overlay = overlay;
    this.loaderText = loaderText;
  }

  hide() {
    this.overlay.classList.add('hidden');
    window.setTimeout(() => {
      this.overlay.style.display = 'none';
    }, 350);
  }

  showError(message) {
    this.loaderText.textContent = `Error: ${message}`;
  }
}