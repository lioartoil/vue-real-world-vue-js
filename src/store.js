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
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true },
      { id: 4, text: '...', done: false },
    ],
    events: [
      /* 
        { id: 1, title: '...', organizer: '...' },
        { id: 2, title: '...', organizer: '...' },
        { id: 3, title: '...', organizer: '...' },
        { id: 4, title: '...', organizer: '...' },
       */
    ],
  },

  mutations: {
    ADD_EVENT({ events }, event) {
      events.push(event)
    },
  },

  actions: {
    async createEvent({ commit }, event) {
      await EventService.postEvent(event)

      commit('ADD_EVENT', event)
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
