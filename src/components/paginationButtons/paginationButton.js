import eventBus from '../../core/eventBus'
import events from '../../constants/events'

class PaginationButton extends HTMLButtonElement {
  constructor() {
    super()
  }

  get page() {
    return +this.getAttribute('page')
  }

  handleClick = () => {
    eventBus.fire(events.pagination, { page: this.page })
  }

  connectedCallback() {
    this.addEventListener('click', this.handleClick)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.handleClick)
  }
}

customElements.define('pagination-button', PaginationButton, {
  extends: 'button'
})
