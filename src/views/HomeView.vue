<template>
  <div
    v-if="currentEvent"
    class="grid grid-rows-2 flex-grow h-full divide-y divide-orange-150"
  >
    <div class="flex justify-center items-center">
      <EventWrapper
        :event="currentEvent"
        :hide-date="!guessedEventId"
        :is-correct="isCorrect"
      >
        <NextButton
          v-if="guessedEventId"
          :is-correct="isCorrect"
          class="absolute -right-40"
          @click="next()"
        />
      </EventWrapper>
    </div>
    <div class="flex items-center overflow-hidden">
      <div class="flex flex-grow pb-4 overflow-x-scroll">
        <div class="flex gap-8 mx-auto">
          <BeforeAfterButton
            id="BeforeAllEvents"
            :correct-event-id="correctEventId"
            :guessed-event-id="guessedEventId"
            @click="guessEvent('BeforeAllEvents')"
          />
          <div
            v-for="event in events"
            :key="event.id"
            class="flex gap-8"
          >
            <EventWrapper :event="event" />
            <BeforeAfterButton
              :id="event.id"
              :correct-event-id="correctEventId"
              :guessed-event-id="guessedEventId"
              @click="guessEvent(event.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  Ref,
  ref,
  computed
} from 'vue';
import eventsList from '@/assets/events';
import EventWrapper from '@/components/EventWrapper.vue';
import BeforeAfterButton from '@/components/BeforeAfterButton.vue';
import NextButton from '@/components/NextButton.vue';
import { Event } from '@/models/event';

export default defineComponent({
  name: 'HomeView',
  components: {
    EventWrapper,
    BeforeAfterButton,
    NextButton
  },
  setup() {
    const events: Ref<Event[]> = ref([]);

    const currentEvent: Ref<Event | null> = ref(null);

    const correctEventId = ref('');

    const guessedEventId = ref('');

    onMounted(() => {
      getFirstEvent();
      getCurrentEvent();
    });

    function getFirstEvent(): void {
      events.value.push(getRandomEvent());
    }

    function getCurrentEvent(): void {
      currentEvent.value = getRandomEvent();
      correctEventId.value = getCorrectEventId();
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

    function getCorrectEventId(): string {
      const correctEvent = events.value.find((comparedEvent: Event) => {
        const comparedIndex = events.value.findIndex((event: Event) => event.id === comparedEvent.id);
        return isAfterPreviousEvent(comparedEvent) && isBeforeNextEvent(comparedIndex);
      });

      return correctEvent ? correctEvent.id : 'BeforeAllEvents';
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

    function guessEvent(eventId: string): void {
      guessedEventId.value = eventId;
    }

    function next(): void {
      if (isCorrect.value) {
        insertCurrentEventInList();
      } else {
        events.value = [];
        getFirstEvent();
      }

      guessedEventId.value = '';
      getCurrentEvent();
    }

    const isCorrect = computed<boolean>(() => {
      return correctEventId.value === guessedEventId.value;
    });

    function insertCurrentEventInList(): void {
      const index = events.value.findIndex((event: Event) => event.id === guessedEventId.value);

      if (currentEvent.value) {
        events.value.splice(index + 1, 0, currentEvent.value);
      }
    }

    return {
      events,
      currentEvent,
      correctEventId,
      guessEvent,
      guessedEventId,
      isCorrect,
      next
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
