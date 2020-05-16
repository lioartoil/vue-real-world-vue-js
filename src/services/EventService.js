import { create } from 'axios'

const apiClient = create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application',
  },
})

export default {
  getEvent(id) {
    return apiClient.get(`/events/${id}`)
  },

  getEvents() {
    return apiClient.get('/events')
  },
}
