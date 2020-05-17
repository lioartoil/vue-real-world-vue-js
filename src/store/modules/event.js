import EventService from '@/services/EventService.js'

export const namespaced = true

export const state = {
  event: {},
  events: [],
  eventsTotal: 0,
}

export const mutations = {
  ADD_EVENT({ events }, event) {
    events.push(event)
  },
  SET_EVENT(state, event) {
    state.event = { ...event }
  },
  SET_EVENTS(state, events) {
    state.events = [...events]
  },
  SET_EVENTS_TOTAL(state, eventsTotal) {
    state.eventsTotal = eventsTotal
  },
}

export const actions = {
  async createEvent({ commit, dispatch }, event) {
    try {
      await EventService.postEvent(event)

      commit('ADD_EVENT', event)

      const notification = {
        type: 'success',
        message: 'Your event has been created!',
      }

      dispatch('notification/add', notification, { root: true })
    } catch (error) {
      const notification = {
        type: 'error',
        message: `There was a problem creating your event: ${error.message}`,
      }
      dispatch('notification/add', notification, { root: true })
      throw error
    }
  },
  fetchEvent({ commit, dispatch, getters }, id) {
    const event = getters.getEventById(id)

    if (event) {
      commit('SET_EVENT', event)

      return event
    }

    return EventService.getEvent(id)
      .then(({ data }) => {
        commit('SET_EVENT', data)

        return data
      })
      .catch(({ message }) => {
        const notification = {
          type: 'error',
          message: `There was a problem fetching an event: ${message}`,
        }
        dispatch('notification/add', notification, { root: true })
      })
  },
  async fetchEvents({ commit, dispatch }, { perPage, page }) {
    try {
      const {
        data,
        headers: { 'x-total-count': eventsTotal },
      } = await EventService.getEvents(perPage, page)

      commit('SET_EVENTS', data)
      commit('SET_EVENTS_TOTAL', parseInt(eventsTotal, 10))
    } catch ({ message }) {
      const notification = {
        type: 'error',
        message: `There was a problem fetching events: ${message}`,
      }
      dispatch('notification/add', notification, { root: true })
    }
  },
}

export const getters = {
  /* 
      activeTodosCount: ({ todos }) => todos.filter(({ done }) => !done).length,
      catLength: ({ categories: { length } }) => length,
      doneTodos: ({ todos }) => todos.filter(({ done }) => done),
     */
  getEventById: ({ events }) => (id) => events.find((event) => event.id === id),
}
