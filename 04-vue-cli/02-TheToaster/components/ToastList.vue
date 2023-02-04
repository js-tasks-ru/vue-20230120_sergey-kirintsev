<template>
  <div class="toasts">
    <toast-item v-for="toast in toasts" :key="toast.id" v-bind="toast" @close="onClose" />
  </div>
</template>

<script>
import ToastItem from './ToastItem.vue';

export default {
  name: 'ToastList',

  components: {
    ToastItem,
  },

  props: {
    toasts: {
      type: Array,
      required: true,
    },
  },

  emits: ['close'],

  methods: {
    onClose(id) {
      this.$emit('close', id);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
