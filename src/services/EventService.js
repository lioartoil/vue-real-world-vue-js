import axios from 'axios'
import NProgress from 'nprogress'

const apiClient = axios.create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

apiClient.interceptors.request.use((response) => {
  NProgress.done()
  return response
})

export default {
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },

  getEvents(perPage, page) {
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },

  postEvent(event) {
    return apiClient.post('/events', event)
  },
}
