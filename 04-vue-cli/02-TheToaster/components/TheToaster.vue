<template>
  <toast-list :toasts="toasts" @close="removeToast" />
</template>

<script>
import ToastList from './ToastList.vue';

const removeTimeout = 5_000;

const toastConfig = {
  success: {
    icon: 'check-circle',
  },
  error: {
    icon: 'alert-circle',
  },
  info: {
    icon: 'user',
  },
  warning: {
    icon: 'tv',
  },
};

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
        icon: 'check-circle',
        message,
        id,
      });
      this.removeMe(id);
    },

    error(message) {
      const id = this.getId();
      this.toasts.push({
        type: 'error',
        icon: 'alert-circle',
        message,
        id,
      });
      this.removeMe(id);
    },

    getId() {
      return Date.now();
    },

    createToast(type, message) {
      const id = this.getId();
      this.toasts.push({
        type,
        icon: toastConfig[type].icon,
        message,
        id,
      });
      this.removeMe(id);
    },
  },
};
</script>
