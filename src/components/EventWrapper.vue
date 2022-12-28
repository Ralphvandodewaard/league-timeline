<template>
  <div class="flex flex-col items-center gap-2">
    <div
      :style="getImageBackgroundStyle()"
      class="w-40 h-72 bg-cover border-2 border-orange-150 rounded-lg"
    />
    <div class="flex flex-col items-center text-lg">
      <p>
        {{  event.type }}:
        <span class="font-semibold">
          {{ event.label }}
        </span>
      </p>
      <p v-if="!hideDate">
        {{ event.date }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
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
    }
  },
  setup(props) {
    function getImageBackgroundStyle(): any {
      const url = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${props.event.id}_0.jpg`;
      return { backgroundImage: `url(${url})` };
    }

    return {
      getImageBackgroundStyle
    };
  }
});
</script>
