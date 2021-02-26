import { MDCTextField } from '@material/textfield'
import debounce from 'lodash/debounce'

import events from '../../constants/events'
import eventBus from '../../core/eventBus'

const template = document.createElement('template')
template.innerHTML = `
  <div class="mdc-layout-grid">
    <div class="mdc-layout-grid__inner">
      <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
        <label class="mdc-text-field mdc-text-field--filled mdc-text-field--full-width">
          <span class="mdc-text-field__ripple"></span>
          <span class="mdc-floating-label" id="my-label-id">Search for a title</span>
          <input aria-labelledby="my-label-id"
                 class="mdc-text-field__input" 
                 id="search-field" 
                 is="search-field" 
                 type="text">
          <span class="mdc-line-ripple"></span>
        </label>
      </div>
    </div>
  </div>
`

class SearchField extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true))
    this.input = this.querySelector('input')
    this.input.addEventListener('input', this.handleInputChange)
    this.MDCTextField = new MDCTextField(
      document.querySelector('.mdc-text-field')
    )
  }

  disconnectedCallback() {
    this.input.removeEventListener('input', this.handleInputChange)
  }

  handleInputChange = debounce((event) => {
    eventBus.fire(events.search, event.target.value)
  }, 400)
}

customElements.define('search-field', SearchField)
