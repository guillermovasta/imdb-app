import events from '../../constants/events'
import eventBus from '../../core/eventBus'
import find from '../../service/title'

class MovieList extends HTMLElement {
  movies = []

  handleOnSearch = async (event) => {
    try {
      const searchTerm = event.detail
      if (searchTerm) {
        const movies = await find(event.detail)
        this.movies = movies.results
      } else {
        this.movies = []
      }
      this.render()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    this.innerHTML = `
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          ${this.movies
            .map(
              (movie, key) => `
                <div class="mdc-layout-grid__cell">
                  <movie-card title="${movie.title}" image="${
                movie.image ? movie.image.url : ''
              }" id="${key}"></movie-card>
                </div>
              `
            )
            .join('')}
        </div>
      </div>
    `
  }

  connectedCallback() {
    this.render()
    eventBus.register(events.search, this.handleOnSearch)
  }
}

customElements.define('movie-list', MovieList)
