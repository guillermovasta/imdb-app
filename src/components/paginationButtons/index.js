class PaginationButtons extends HTMLElement {
  get pages() {
    return +this.getAttribute('pages')
  }

  get selected() {
    return +this.getAttribute('selected')
  }

  getButtonsHTML() {
    let html = ''
    for (let i = 1; i <= this.pages; i++) {
      html = html.concat(`
        <button class="pagination-button ${
          i === this.selected ? 'pagination-button--selected' : ''
        }" is="pagination-button" page="${i}">${i}</button>
      `)
    }
    return html
  }

  connectedCallback() {
    this.innerHTML = `
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell">
            ${this.getButtonsHTML()}
          </div>
        </div>
      </div>
    `
  }
}

customElements.define('pagination-buttons', PaginationButtons)
