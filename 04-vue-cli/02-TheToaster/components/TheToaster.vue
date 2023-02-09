<template>
  <toast-list :toasts="toasts" @close="removeToast" />
</template>

<script>
import ToastList from './ToastList.vue';

const removeTimeout = 5_000;

let lastId = 0;

export default {
  name: 'TheToaster',

  components: { ToastList },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    removeToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },

    removeMe(id) {
      setTimeout(() => {
        this.removeToast(id);
      }, removeTimeout);
    },

    success(message) {
      const id = this.getId();
      this.toasts.push({
        type: 'success',
        message,
        id,
      });
      this.removeMe(id);
    },

    error(message) {
      const id = this.getId();
      this.toasts.push({
        type: 'error',
        message,
        id,
      });
      this.removeMe(id);
    },

    getId() {
      return lastId++;
    },

    createToast(type, message) {
      const id = this.getId();
      this.toasts.push({
        type,
        message,
        id,
      });
      this.removeMe(id);
    },
  },
};
</script>
