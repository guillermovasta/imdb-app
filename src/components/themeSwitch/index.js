import { MDCSwitch } from '@material/switch'
import events from '../../constants/events'
import eventBus from '../../core/eventBus'

class ThemeSwitch extends HTMLElement {
  constructor() {
    super()
    this.innerHTML = `
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
            <div class="theme-switch">
              <div class="mdc-switch">
                <div class="mdc-switch__track"></div>
                <div class="mdc-switch__thumb-underlay">
                  <div class="mdc-switch__thumb"></div>
                  <input type="checkbox" 
                        id="basic-switch" 
                        class="mdc-switch__native-control" 
                        role="switch" 
                        aria-checked="false">
                </div>
              </div>
              <label for="basic-switch">Change Theme</label>
            </div>
          </div>
        </div>
      </div>
    `
    this.on = true
    this.input = this.querySelector('input')
    this.input.addEventListener('change', this.handleInputChange)
    const switchControl = new MDCSwitch(document.querySelector('.mdc-switch'))
  }

  handleInputChange = () => {
    this.on = !this.on
    eventBus.fire(events.theme, { on: !this.on })
  }
}

customElements.define('theme-switch', ThemeSwitch)
