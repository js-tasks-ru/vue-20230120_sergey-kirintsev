<template>
  <div
    class="input-group"
    :class="{
      'input-group_icon': checkSlots(),
      'input-group_icon-left': hasLeftIconSlot(),
      'input-group_icon-right': hasRightIconSlot(),
    }"
  >
    <div v-if="hasLeftIconSlot()" class="input-group__icon">
      <slot name="left-icon" />
    </div>

    <textarea
      v-if="multiline"
      ref="input"
      v-bind="$attrs"
      v-model="modelValueProxy"
      class="form-control"
      :class="{
        'form-control_rounded': rounded,
        'form-control_sm': small,
      }"
      @input="onInput"
    />

    <input
      v-else
      ref="input"
      v-bind="$attrs"
      :value="modelValue"
      :class="{
        'form-control_rounded': rounded,
        'form-control_sm': small,
      }"
      class="form-control"
      @change="onChange"
      @input="onInput"
    />

    <div v-if="hasRightIconSlot()" class="input-group__icon">
      <slot name="right-icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiInput',

  inheritAttrs: false,

  props: {
    modelValue: {
      type: [String, Boolean],
    },
    modelModifiers: {
      default: () => ({}),
    },
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    multiline: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    modelValueProxy: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      },
    },

    hasLazy() {
      return this.modelModifiers?.lazy;
    },
  },

  methods: {
    checkSlots() {
      return !!this.$slots['left-icon'] || !!this.$slots['right-icon'];
    },

    hasLeftIconSlot() {
      return !!this.$slots['left-icon'];
    },

    hasRightIconSlot() {
      return !!this.$slots['right-icon'];
    },

    focus() {
      this.$refs.input.focus();
    },

    onInput(e) {
      if (!this.hasLazy) {
        this.$emit('update:modelValue', e.target.value);
      }
    },
    onChange(e) {
      if (this.hasLazy) {
        this.$emit('update:modelValue', e.target.value);
      }
    },
  },
};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s border-color;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon-left .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon-right .form-control {
  padding-right: 50px;
}

.input-group.input-group_icon .input-group__icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .input-group__icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .input-group__icon:last-child {
  right: 16px;
}
</style>