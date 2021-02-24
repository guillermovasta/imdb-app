import { MDCTextField } from '@material/textfield'
import debounce from 'lodash/debounce'
import events from '../../constants/events'

const template = document.createElement('template')
template.innerHTML = `
  <label class="mdc-text-field mdc-text-field--filled">
    <span class="mdc-text-field__ripple"></span>
    <span class="mdc-floating-label" id="my-label-id">Search for a title</span>
    <input is="search-field" class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
    <span class="mdc-line-ripple"></span>
  </label>
`

class SearchField extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    this.appendChild(template.content.cloneNode(true))
    this.input = this.querySelector('input')
    this.input.addEventListener('input', this.handleInputChange)
    this.MDC = new MDCTextField(document.querySelector('.mdc-text-field'))
  }

  disconnectedCallback() {
    this.input.removeEventListener('input', this.handleInputChange)
  }

  handleInputChange = debounce((event) => {
    const searchValue = event.target.value
    console.log(searchValue)
    this.dispatchEvent(new CustomEvent(events.search, { searchValue }))
  }, 300)
}

customElements.define('search-field', SearchField)
