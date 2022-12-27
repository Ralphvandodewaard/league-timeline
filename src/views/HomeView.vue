<template>
  <div>
    <div
      v-for="event in events"
      :key="event.id"
    >
      {{ event.label }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import eventsList from '@/assets/events';
import { Event } from '@/models/event';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const events: Ref<Event[]> = ref([]);

    const currentEvent: Ref<Event | null> = ref(null);

    onMounted(() => {
      getFirstEvent();
      getCurrentEvent();
    });

    function getFirstEvent(): void {
      events.value.push(getRandomEvent());
    }

    function getCurrentEvent(): void {
      currentEvent.value = getRandomEvent();
    }

    function getRandomEvent(): Event {
      let randomEvent = eventsList[getRandomNumber()];
      while (events.value.some((event: Event) => event.id === randomEvent.id || event.date === randomEvent.date)) {
        randomEvent = eventsList[getRandomNumber()];
      }

      return randomEvent;
    }

    function getRandomNumber(): number {
      return Math.round(Math.random() * (eventsList.length - 1));
    }

    return {
      events
    };
  }
});
</script>
