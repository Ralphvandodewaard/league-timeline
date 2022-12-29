<template>
  <button
    :disabled="hasGuessed"
    :class="getButtonClasses"
    class="flex justify-center items-center w-28 sm:w-40 h-52 sm:h-72 sm:text-lg border-2 border-dashed rounded-lg"
  >
    <p
      v-if="!hasGuessed && score === 0"
      class="animate-pulse"
    >
      {{  getOlderNewerText }}
    </p>
    <p v-if="hasGuessed && hasGuessedThisButton">
      {{  getCorrectWrongText }}
    </p>
  </button>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BeforeAfterButton',
  props: {
    id: {
      type: String,
      required: true
    },
    correctEventId: {
      type: String,
      default: ''
    },
    guessedEventId: {
      type: String,
      default: ''
    },
    score: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const hasGuessed = computed<boolean>(() => {
      return !!props.guessedEventId;
    });

    const hasGuessedThisButton = computed<boolean>(() => {
      return props.guessedEventId === props.id;
    });

    const isCorrect = computed<boolean>(() => {
      return props.id === props.correctEventId;
    });

    const getButtonClasses = computed<string>(() => {
      if (hasGuessed.value) {
        if (hasGuessedThisButton.value) {
          return isCorrect.value ? 'text-green-400 border-green-400' : 'text-red-400 border-red-400';
        } else {
          return isCorrect.value ? 'border-green-400' : '';
        }
      } else {
        return 'border-orange-150 hover:animate-pulse';
      }
    });

    const getOlderNewerText = computed<string>(() => {
      return props.id === 'BeforeAllEvents' ? 'Older' : 'Newer';
    });
    const getCorrectWrongText = computed<string>(() => {
      return isCorrect.value ? 'Correct!' : 'Wrong';
    });

    return {
      getButtonClasses,
      hasGuessed,
      hasGuessedThisButton,
      getOlderNewerText,
      getCorrectWrongText
    };
  }
});
</script>
