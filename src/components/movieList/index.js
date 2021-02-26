import events from '../../constants/events'
import eventBus from '../../core/eventBus'
import findMovies from '../../service/movie'
import { pagination } from '../../constants/ui'

class MovieList extends HTMLElement {
  movies = []
  pagination = {
    selectedPage: 1
  }

  handleOnSearch = async (event) => {
    try {
      const searchTerm = event.detail
      if (searchTerm) {
        const movies = await findMovies(searchTerm)
        this.movies = movies.results
        this.pagination.selectedPage = 1
      } else {
        this.movies = []
      }
      this.render()
    } catch (error) {
      console.error(error)
    }
  }

  handleOnPageChange = (event) => {
    this.pagination.selectedPage = event.detail.page
    this.render()
  }

  render() {
    const filteredMovies = this.movies.filter(
      (movie) => movie.titleType === 'movie'
    )
    const paginatedMovies = filteredMovies.slice(
      (this.pagination.selectedPage - 1) * pagination.pageSize,
      this.pagination.selectedPage * pagination.pageSize
    )
    this.innerHTML = `
      <div>
        <div class="mdc-layout-grid">
          <div class="mdc-layout-grid__inner">
          ${paginatedMovies
            .map(
              (movie, key) => `
                <div class="mdc-layout-grid__cell">
                  <movie-card id="${key}"
                              image-url="${movie.image.url}" 
                              title="${movie.title}"></movie-card>
                </div>
              `
            )
            .join('')}
          </div>
        </div>
        <pagination-buttons pages="${Math.ceil(
          filteredMovies.length / pagination.pageSize
        )}" 
          selected-page="${this.pagination.selectedPage}"></pagination-buttons>
      </div>
    `
  }

  connectedCallback() {
    eventBus.register(events.search, this.handleOnSearch)
    eventBus.register(events.pagination, this.handleOnPageChange)
  }

  disconnectedCallback() {
    eventBus.remove(events.search, this.handleOnSearch)
    eventBus.remove(events.pagination, this.handleOnPageChange)
  }
}

customElements.define('movie-list', MovieList)
