import Vue from 'vue'
import Vuex from 'vuex'

import * as event from '@/store/modules/event'
import * as notification from '@/store/modules/notification'
import * as user from '@/store/modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    event,
    notification,
    user,
  },

  state: {
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community',
    ],
  },
})
