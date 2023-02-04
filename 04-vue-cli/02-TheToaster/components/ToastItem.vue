<template>
  <div :class="classes">
    <ui-icon class="toast__icon" :icon="icon" />
    <span>{{ message }}</span>
    <button class="toast__close" @click="$emit('close', id)">✘</button>
  </div>
</template>

<script>
import UiIcon from './UiIcon.vue';

export default {
  name: 'ToastItem',

  components: {
    UiIcon,
  },

  props: {
    id: {
      type: [String, Number],
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },

  emits: ['close'],

  computed: {
    classes() {
      return `toast toast_${this.type.toLowerCase()}`;
    },
  },
};
</script>

<style scoped>
.toast {
  position: relative;
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast__icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

.toast.toast_info {
  color: var(--grey);
}

.toast.toast_warning {
  color: var(--red-light);
}
.toast__close {
  position: absolute;
  top: -7px;
  right: -7px;
  outline: none;
  background: white;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: 2px solid burlywood;
  border-radius: 50%;
}
</style>
