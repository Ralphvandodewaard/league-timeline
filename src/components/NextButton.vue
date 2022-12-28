<template>
  <button
    :class="isCorrect ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400'"
    class="flex justify-center items-center w-32 py-2 text-lg font-semibold border-2 rounded-lg"
  >
    <p v-if="isCorrect">
      Next
    </p>
    <p v-else>
      Try again
    </p>
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NextButton',
  props: {
    isCorrect: {
      type: Boolean,
      required: true
    }
  }
});
</script>
