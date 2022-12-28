<template>
  <div
    v-if="currentEvent"
    class="grid grid-rows-2 flex-grow h-full divide-y divide-orange-150"
  >
    <div class="flex justify-center items-center">
      <EventWrapper :event="currentEvent" />
    </div>
    <div class="flex justify-center items-center gap-4">
      <EventWrapper
        v-for="event in events"
        :key="event.id"
        :event="event"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import eventsList from '@/assets/events';
import EventWrapper from '@/components/EventWrapper.vue';
import { Event } from '@/models/event';

export default defineComponent({
  name: 'HomeView',
  components: {
    EventWrapper
  },
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

    function getImageBackgroundStyle(id: string): any {
      const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${id}_0.jpg`;
      return { backgroundImage: `url(${url})` };
    }

    return {
      events,
      currentEvent,
      getImageBackgroundStyle
    };
  }
});
</script>
