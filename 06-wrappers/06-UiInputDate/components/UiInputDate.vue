<template>
  <UiInput :model-value="computedValue" :type="type" :step="step" @input="handleInput">
    <template v-for="slotName in Object.keys($slots)" #[slotName]>
      <slot :name="slotName" />
    </template>
  </UiInput>
</template>

<script>
import UiInput from './UiInput.vue';

export default {
  name: 'UiInputDate',

  components: { UiInput },

  props: {
    type: {
      type: String,
      default: 'date',
      validator: (value) => ['date', 'time', 'datetime-local'].includes(value),
    },

    modelValue: {
      type: Number,
      default: null,
    },

    step: {
      type: String,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    timezoneOffset() {
      const date = new Date();
      return date.getTimezoneOffset() * 60_000;
    },

    computedValue() {
      if (this.modelValue) {
        const dateStr = new Date(this.modelValue).toISOString();
        if (this.type === 'date') {
          return dateStr.slice(0, 10);
        }
        if (this.type === 'time') {
          return dateStr.slice(11, 16);
        }
        if (this.type === 'datetime-local') {
          return dateStr.slice(0, 16);
        }
      }
      return '';
    },
  },

  methods: {
    handleInput(e) {
      this.$emit('update:modelValue', e.target.valueAsNumber);
    },
  },
};
</script>
