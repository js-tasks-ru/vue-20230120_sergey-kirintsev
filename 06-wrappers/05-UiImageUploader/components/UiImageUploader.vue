<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isUploading }"
      :style="backgroundUrl"
      @click="handleClickLabel"
    >
      <span v-if="isUploading" class="image-uploader__text">Загрузка...</span>
      <span v-else-if="selectedFile" class="image-uploader__text">Удалить изображение</span>
      <span v-else class="image-uploader__text">Загрузить изображение</span>
    </label>
    <input
      ref="input"
      v-bind="$attrs"
      :disabled="isUploading"
      type="file"
      accept="image/*"
      class="image-uploader__input"
      @change="handleChange"
    />
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',

  inheritAttrs: false,

  props: {
    preview: {
      type: String,
    },
    uploader: {
      type: Function,
    },
  },

  emits: ['select', 'upload', 'error', 'remove'],

  data() {
    return {
      selectedFile: undefined,
      isUploading: false,
    };
  },

  computed: {
    backgroundUrl() {
      if (this.selectedFile) {
        return `--bg-url: url(${this.selectedFile})`;
      }
      return null;
    },
  },

  created() {
    if (this.preview) {
      this.selectedFile = this.preview;
    }
  },

  methods: {
    handleChange(e) {
      const file = e.target.files[0];

      this.selectedFile = URL.createObjectURL(file);

      this.$emit('select', file);

      this.uploadImage(file);
    },

    uploadImage(file) {
      if (typeof this.uploader === 'function') {
        this.isUploading = true;
        this.uploader(file)
          .then((response) => {
            this.$emit('upload', response);
          })
          .catch((error) => {
            this.$refs.input.value = null;
            this.selectedFile = undefined;
            this.$emit('error', error);
          })
          .finally(() => {
            this.isUploading = false;
          });
      }
    },

    handleClickLabel(e) {
      if (this.isUploading) {
        return;
      }
      if (this.selectedFile) {
        this.$refs.input.value = null;
        this.$emit('remove');
        this.selectedFile = undefined;
      } else {
        this.$refs.input.click();
      }
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
