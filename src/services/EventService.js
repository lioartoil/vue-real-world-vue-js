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

  getEvents() {
    return apiClient.get('/events')
  },
}
