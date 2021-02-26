import { RAPIDAPI_HOST, RAPIDAPI_KEY } from '../constants/api'

const findMovies = async (q) => {
  const response = await fetch(`https://${RAPIDAPI_HOST}/title/find?q=${q}`, {
    method: 'get',
    headers: {
      'x-rapidapi-key': RAPIDAPI_KEY,
      'x-rapidapi-host': RAPIDAPI_HOST
    }
  })
  const result = await response.json()
  return result
}

export default findMovies
