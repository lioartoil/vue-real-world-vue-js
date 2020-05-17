import Vue from 'vue'
import Vuex from 'vuex'

import EventService from '@/services/EventService.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: 'abc123', name: 'Adam Jahr' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
    event: {},
    events: [],
    eventsTotal: 0,
  },

  mutations: {
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
  },

  actions: {
    async createEvent({ commit }, event) {
      await EventService.postEvent(event)

      commit('ADD_EVENT', event)
    },
    async fetchEvent({ commit, getters }, id) {
      const event = getters.getEventById(id)

      if (event) {
        return commit('SET_EVENT', event)
      }

      try {
        const { data } = await EventService.getEvent(id)

        commit('SET_EVENT', data)
      } catch ({ response }) {
        console.log(`There was an error: ${response}`)
      }
    },
    async fetchEvents({ commit }, { perPage, page }) {
      try {
        const {
          data,
          headers: { 'x-total-count': eventsTotal },
        } = await EventService.getEvents(perPage, page)

        commit('SET_EVENTS', data)
        commit('SET_EVENTS_TOTAL', parseInt(eventsTotal, 10))
      } catch ({ response }) {
        console.log(`There was an error: ${response}`)
      }
    },
  },

  getters: {
    /* 
      activeTodosCount: ({ todos }) => todos.filter(({ done }) => !done).length,
      catLength: ({ categories: { length } }) => length,
      doneTodos: ({ todos }) => todos.filter(({ done }) => done),
     */
    getEventById: ({ events }) => (id) =>
      events.find((event) => event.id === id),
  },
})
