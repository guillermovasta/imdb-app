class MovieCard extends HTMLElement {
  constructor() {
    super()
  }

  get title() {
    const title = this.getAttribute('title')
    return title === 'undefined' ? 'Comming soon' : title
  }

  get image() {
    const imageUrl = this.getAttribute('image')
    return imageUrl === 'undefined'
      ? 'https://via.placeholder.com/350'
      : imageUrl
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
