<template>
  <div class="flex flex-col items-center gap-2 w-40">
    <div
      :style="getImageBackgroundStyle()"
      class="relative flex items-center w-full h-72 bg-cover border-2 border-orange-150 rounded-lg"
    >
      <slot />
    </div>
    <div class="flex flex-col items-center w-max text-lg">
      <p>
        {{  event.type }}:
        <span class="font-semibold">
          {{ event.label }}
        </span>
      </p>
      <p
        :class="[
          hideDate ? 'opacity-0' : 'opacity-100',
          getTextColorClass
        ]"
      >
        {{ getFormattedDate() }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import { Event } from '@/models/event';

export default defineComponent({
  name: 'EventWrapper',
  props: {
    event: {
      type: Object as PropType<Event>,
      required: true
    },
    hideDate: {
      type: Boolean,
      default: false
    },
    isCorrect: {
      type: Boolean || null,
      default: null
    }
  },
  setup(props) {
    function getImageBackgroundStyle(): any {
      const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.event.id}_0.jpg`;
      return { backgroundImage: `url(${url})` };
    }

    function getFormattedDate(): string {
      const date = new Date(props.event.date);
      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      };
      const formattedDate = new Intl.DateTimeFormat('en-UK', options).format(date);

      return formattedDate;
    }

    const getTextColorClass = computed<string>(() => {
      if (typeof props.isCorrect === 'boolean') {
        return props.isCorrect ? 'text-green-400' : 'text-red-400';
      } else {
        return '';
      }
    });

    return {
      getImageBackgroundStyle,
      getFormattedDate,
      getTextColorClass
    };
  }
});
</script>
