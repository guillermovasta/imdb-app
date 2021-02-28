// import { MDCSlider } from '@material/slider'
import events from '../../constants/events'
import eventBus from '../../core/eventBus'

const formats = {
  rgba: 'rgba',
  hsla: 'hsla'
  // hexa: 'hexa'
}

const parameters = {
  [formats.hexa]: [],
  [formats.rgba]: [
    ['red', 255],
    ['green', 255],
    ['blue', 255],
    ['alpha', 1]
  ],
  [formats.hsla]: [
    ['hue', 359],
    ['saturation', 100],
    ['luminosity', 100],
    ['alpha', 1]
  ]
}

class ColorPicker extends HTMLElement {
  constructor() {
    super()
    this.format = formats.rgba
    this.values = ['0', '0', '0', '0']
    this.createGrid()
    this.createPreview()
    this.createSelect()
    this.createInputs()
    this.createStyle()
    this.container = this.querySelector('.mdc-layout-grid__cell')
    this.container.appendChild(this.preview)
    this.container.appendChild(this.select)
  }

  handleSelectChange = (event) => {
    this.format = event.target.value
    this.clear()
    this.render()
  }

  handleInputChange = (event) => {
    const { dataset, value } = event.target
    const { values, preview, format } = this
    values[dataset.key] = value
    if (values.every((value) => !!value)) {
      let bgColor = `${format}(${values[0]}, ${values[1]}, ${values[2]}, ${values[3]})`
      if (format === formats.hsla) {
        bgColor = `hsla(${values[0]}, ${values[1]}%, ${values[2]}%, ${values[3]})`
      }
      preview.style.backgroundColor = bgColor
      eventBus.fire(events.ui.theme)
    }
  }

  connectedCallback() {
    this.render()
  }

  disconnectedCallback() {
    this.select.removeEventListener('select', this.handleSelectChange)
    this.inputs.forEach((input) =>
      input.removeEventListener('change', this.handleInputChange)
    )
  }

  clear() {
    this.values = ['0', '0', '0', '0']
    this.inputs.forEach((input) => {
      input.value = 0
      input.name = ''
      input.max = 0
      input.dataset.key = ''
    })
    this.preview.style.backgroundColor = ''
  }

  createGrid() {
    this.innerHTML = `
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-12">
          </div>
        </div>
      </div>
   `
  }

  createPreview() {
    const preview = document.createElement('div')
    preview.classList.add('color-picker__preview')
    this.preview = preview
  }

  createSelect() {
    this.select = document.createElement('select')
    Object.keys(formats).map((format) => {
      const option = document.createElement('option')
      option.value = format
      option.text = format
      this.select.appendChild(option)
    })
    this.select.addEventListener('change', this.handleSelectChange)
  }

  createInputs() {
    this.inputs = []
    const control = document.createElement('div')
    const label = document.createElement('label')
    const input = document.createElement('input')
    input.type = 'range'
    input.min = 0
    input.value = 0
    this.inputs = [
      input,
      input.cloneNode(),
      input.cloneNode(),
      input.cloneNode()
    ]
    const controls = [
      control,
      control.cloneNode(),
      control.cloneNode(),
      control.cloneNode()
    ]
    const labels = [
      label,
      label.cloneNode(),
      label.cloneNode(),
      label.cloneNode()
    ]
    this.inputs.forEach((input, key) => {
      input.addEventListener('change', this.handleInputChange)
      controls[key].appendChild(labels[key])
      controls[key].appendChild(input)
    })
    this.controls = controls
  }

  createStyle() {
    const style = document.createElement('style')
    this.style = style
  }

  render() {
    const { controls, format, container } = this
    this.controls.forEach((control, key) => {
      const input = control.querySelector('input')
      input.dataset.key = key
      const name = parameters[format][key][0]
      input.name = name
      if (name === 'alpha') {
        input.step = 0.1
      }
      control.querySelector('label').innerHTML = name
      input.max = parameters[format][key][1]
      container.appendChild(control)
    })
  }
}

customElements.define('color-picker', ColorPicker)
