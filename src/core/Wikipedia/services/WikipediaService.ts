import axios from 'axios'

export default class WikipediaService {
  static async getData(query: string) {
    try {
      const baseURL = `https://en.wikipedia.org/w/api.php?action=parse&format=json&section=0&page=`

      const axiosResponse = await axios.get(`${baseURL}${query}`)

      return axiosResponse.data
    } catch (error) {
      throw error
    }
  }
}