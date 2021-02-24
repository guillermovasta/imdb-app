import debounce from 'lodash/debounce'
import events from '../constants/events'

class SearchField extends HTMLInputElement {
  constructor() {
    super()
    this.addEventListener('input', this.handleInputChange)
  }

  handleInputChange = debounce((event) => {
    const searchValue = event.target.value
    this.dispatchEvent(new CustomEvent(events.search, { searchValue }))
  }, 300)
}

customElements.define('search-field', SearchField, {
  extends: 'input'
})
