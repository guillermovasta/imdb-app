import events from '../../constants/events'
import eventBus from '../../core/eventBus'
import find from '../../service/movie'
import { pageSize } from '../../constants/ui'

class MovieList extends HTMLElement {
  movies = []
  pageNumber = 1

  handleOnSearch = async (event) => {
    try {
      const searchTerm = event.detail
      if (searchTerm) {
        const movies = await find(searchTerm)
        this.movies = movies.results
      } else {
        this.movies = []
      }
      this.render()
    } catch (error) {
      console.error(error)
    }
  }

  handleOnPageChanged = (event) => {
    this.pageNumber = event.detail.page
    this.render()
  }

  render() {
    const filteredMovies = this.movies
      .slice()
      .filter((movie) => movie.titleType === 'movie')
    const paginatedMovies = filteredMovies.slice(
      (this.pageNumber - 1) * pageSize,
      this.pageNumber * pageSize
    )
    this.innerHTML = `
    <div>
      <div class="mdc-layout-grid">
        <div class="mdc-layout-grid__inner">
          ${paginatedMovies
            .map(
              (movie, key) => `
                <div class="mdc-layout-grid__cell">
                  <movie-card title="${movie.title}" image="${
                movie.image && movie.image.url
              }" id="${key}"></movie-card>
                </div>
              `
            )
            .join('')}
            </div>
            </div>
            <pagination-buttons pages="${Math.ceil(
              filteredMovies.length / pageSize
            )}" selected="${this.pageNumber}"></pagination-buttons>
            
        </div>
    `
  }

  connectedCallback() {
    eventBus.register(events.search, this.handleOnSearch)
    eventBus.register(events.pagination, this.handleOnPageChanged)
  }
}

customElements.define('movie-list', MovieList)
