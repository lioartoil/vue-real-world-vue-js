import { create } from 'axios'

const apiClient = create({
  baseURL: `http://localhost:3000`,
  withCredentials: false, // This is the default
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
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
