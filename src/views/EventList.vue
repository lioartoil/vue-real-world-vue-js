<template>
  <div>
    <h1>Events Listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <router-link
      :to="{ name: 'event-list', query: { page: page - 1 } }"
      rel="prev"
    >
      Prev Page
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import EventCard from '@/components/EventCard.vue'

export default {
  components: {
    EventCard,
  },

  created() {
    this.$store.dispatch('fetchEvents', { perPage: 3, page: this.page })
  },

  computed: {
    ...mapState(['events']),
    page() {
      return parseInt(this.$route.query.page) || 1
    },
  },
}
</script>
