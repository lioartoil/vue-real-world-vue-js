<template>
  <div>
    <h1>Events for {{ user.name }}</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <template v-if="page != 1">
      <router-link
        :to="{ name: 'event-list', query: { page: page - 1 } }"
        rel="prev"
      >
        Prev Page
      </router-link></template
    >

    <template v-if="hasNextPage">
      <router-link
        :to="{ name: 'event-list', query: { page: page + 1 } }"
        rel="next"
      >
        Next Page
      </router-link></template
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EventCard from '@/components/EventCard.vue'
import store from '@/store/store'

async function getPageEvents(routeTo, next) {
  const currentPage = parseInt(routeTo.query.page) || 1

  try {
    await store.dispatch('event/fetchEvents', {
      page: currentPage,
    })

    routeTo.params.page = currentPage
    next()
  } catch (e) {}
}

export default {
  props: {
    page: {
      type: Number,
      required: true,
    },
  },

  components: {
    EventCard,
  },

  beforeRouteEnter(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },

  beforeRouteUpdate(routeTo, routeFrom, next) {
    getPageEvents(routeTo, next)
  },

  mounted() {
    console.log('hi')
    console.log(this.event)
  },

  computed: {
    hasNextPage() {
      return this.eventsTotal > this.page * this.event.perPage
    },
    ...mapState({
      event: (state) => state.event,
      user: (state) => state.user.user,
    }),
  },
}
</script>
