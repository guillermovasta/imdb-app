import eventBus from '../../core/eventBus'
import events from '../../constants/events'

class PaginationButtons extends HTMLElement {
  constructor() {
    super()
  }

  get pages() {
    return +this.getAttribute('pages')
  }

  get selectedPage() {
    return +this.getAttribute('selected-page')
  }

  getButtonsHTML() {
    let html = ''
    for (let i = 1; i <= this.pages; i++) {
      html = html.concat(`
        <button is="pagination-button" 
                class="pagination-button ${
                  i === this.selectedPage ? 'pagination-button--selected' : ''
                }" 
                page="${i}">${i}</button>
      `)
    }
    return html
  }

  connectedCallback() {
    this.render()
    eventBus.register(events.colorPicker, (event) => {
      this.bgColor = event.detail.bgColor
    })
    eventBus.register(events.theme, (event) => {
      const btns = this.querySelectorAll('button')
      btns.forEach((button) => {
        button.style.backgroundColor = event.detail.on
          ? this.bgColor
          : 'lightblue'
      })
    })
  }

  render() {
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
