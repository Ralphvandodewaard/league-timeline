<template>
  <div class="absolute top-4 left-4 sm:top-8 sm:left-8 flex flex-col">
    <p>
      High score:
      <span class="font-semibold">
        {{ highScore }}
      </span>
    </p>
    <p class="text-lg">
      Score:
      <span class="font-semibold">
        {{ score }}
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScoreWrapper',
  props: {
    score: {
      type: Number,
      default: 0
    },
    highScore: {
      type: Number,
      default: 0
    }
  }
});
</script>
