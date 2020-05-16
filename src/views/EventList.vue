<template>
  <div>
    <h1>Events Listing</h1>

    <EventCard v-for="event in events" :key="event.id" :event="event" />
  </div>
</template>

<script>
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  components: {
    EventCard,
  },

  data() {
    return {
      events: [],
    }
  },

  async created() {
    try {
      const { data } = await EventService.getEvents()
      this.events = data
    } catch ({ response }) {
      console.log(`There was an error: ${response}`)
    }
  },
}
</script>
