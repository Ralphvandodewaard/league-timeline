<template>
  <div
    v-if="currentEvent"
    class="grid grid-rows-2 flex-grow h-full divide-y divide-orange-150"
  >
    <div class="flex justify-center items-center">
      <EventWrapper
        :event="currentEvent"
        :hide-date="true"
      />
    </div>
    <div class="flex items-center overflow-hidden">
      <div class="flex flex-grow pb-4 overflow-x-scroll">
        <div class="flex gap-8 mx-auto">
          <BeforeAfterButton @click="guessBeforeAllEvents()" />
          <div
            v-for="event in events"
            :key="event.id"
            class="flex gap-8"
          >
            <EventWrapper :event="event" />
            <BeforeAfterButton @click="guessAfterEvent(event)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, Ref, ref } from 'vue';
import eventsList from '@/assets/events';
import EventWrapper from '@/components/EventWrapper.vue';
import BeforeAfterButton from '@/components/BeforeAfterButton.vue';
import { Event } from '@/models/event';

export default defineComponent({
  name: 'HomeView',
  components: {
    EventWrapper,
    BeforeAfterButton
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

    function guessAfterEvent(comparedEvent: Event): void {
      const comparedIndex = events.value.findIndex((event: Event) => event.id === comparedEvent.id);

      if (
        isAfterPreviousEvent(comparedEvent) &&
        isBeforeNextEvent(comparedIndex)
      ) {
        insertCurrentEventInList(comparedIndex);
        getCurrentEvent();
      } else {
        console.log('false');
      }
    }

    function isAfterPreviousEvent(comparedEvent: Event): boolean {
      return currentEvent.value ? getTimeValue(currentEvent.value.date) > getTimeValue(comparedEvent.date) : false;
    }

    function isBeforeNextEvent(comparedIndex: number): boolean {
      return currentEvent.value && comparedIndex + 1 < events.value.length ? getTimeValue(currentEvent.value.date) < getTimeValue(events.value[comparedIndex + 1].date) : true;
    }

    function getTimeValue(date: string): number {
      return new Date(date).valueOf();
    }

    function guessBeforeAllEvents(): void {
      if (currentEvent.value && getTimeValue(currentEvent.value.date) < getTimeValue(events.value[0].date)) {
        insertCurrentEventInList();
        getCurrentEvent();
      } else {
        console.log('false');
      }
    }

    function insertCurrentEventInList(comparedIndex?: number): void {
      if (currentEvent.value) {
        if (typeof comparedIndex === 'number') {
          events.value.splice(comparedIndex + 1, 0, currentEvent.value);
        } else {
          events.value.unshift(currentEvent.value);
        }
      }
    }

    return {
      events,
      currentEvent,
      guessAfterEvent,
      guessBeforeAllEvents
    };
  }
});
</script>

<style lang="css">
div::-webkit-scrollbar {
  @apply h-2;
}

div::-webkit-scrollbar-track {
  @apply bg-gray-900 rounded-lg;
}

div::-webkit-scrollbar-thumb {
  @apply bg-orange-150 rounded-lg;
}
</style>
