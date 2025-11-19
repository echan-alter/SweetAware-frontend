class ArticleModel {
  constructor() {
    this.baseUrl = `${import.meta.env.VITE_API_BASE_URL}/api/articles`
  }

  async getArticles(topic = 'diabetes', limit = 10) {
    try {
      const response = await fetch(`${this.baseUrl}?topic=${topic}&limit=${limit}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching articles:', error)
      throw error
    }
  }
}

export default ArticleModel
