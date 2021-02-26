class MovieCard extends HTMLElement {
  constructor() {
    super()
  }

  get title() {
    return this.getAttribute('title')
  }

  get imageURL() {
    return this.getAttribute('image-url')
  }

  get id() {
    return this.getAttribute('id')
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.innerHTML = `
      <style>
        .movie-card__media--${this.id} {
          background-image: url("${this.imageURL}");
        }
      </style>
      <div class="movie-card mdc-card">
        <div class="movie-card__media movie-card__media--${this.id} mdc-card__media mdc-card__media--16-9">
        </div>
        <div class="movie-card__content">
          <h3 class="movie-card__title">${this.title}</h3>
        </div>
      </div>
    `
  }
}

customElements.define('movie-card', MovieCard)
