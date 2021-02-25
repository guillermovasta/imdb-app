class Card extends HTMLElement {
  static get observedAttributes() {
    return ['title', 'image', 'id']
  }

  constructor() {
    super()
  }

  get title() {
    return this.getAttribute('title')
  }

  get image() {
    return this.getAttribute('image')
  }

  get id() {
    return this.getAttribute('id')
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        .movie-card__media--${this.id} {
          background-image: url("${this.image}");
        }
      </style>
      <div class="mdc-card movie-card">
        <div class="movie-card__media movie-card__media--${this.id} mdc-card__media mdc-card__media--16-9">
        </div>
        <div class="movie-card__content">
          <h3 class="movie-card__title">${this.title}</h3>
        </div>
      </div>
    `
  }
}

customElements.define('movie-card', Card)
