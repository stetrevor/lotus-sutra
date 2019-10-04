<template>
  <div class="snackbar">
    <div class="snackbar__message">{{ message }}</div>
    <div
      class="snackbar__button snackbar__button--accept"
      @click="$emit('snackbar-accept')"
    >
      {{ acceptText }}
    </div>
    <div
      class="snackbar__button snackbar__button--cancel"
      @click="$emit('snackbar-cancel')"
    >
      {{ cancelText }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },

    acceptText: {
      type: String,
      default: 'ok',
    },

    cancelText: {
      type: String,
      default: 'cancel',
    },
  },
}
</script>

<style lang="scss">
@import '@/scss/_mixins';

.snackbar {
  position: fixed;
  bottom: 24px;
  left: 24px;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 4px 12px;
  width: calc(100% - 24px * 2);
  max-width: $query-max-width - 24px * 2;
  height: 48px;

  background-color: #905c21; /* grizzly */
  color: #f7ebde; /* moccasin */
  font-size: 0.5em;
  letter-spacing: 0.02em;
  line-height: 40px;

  display: flex;

  &__message {
    margin-right: auto;
  }

  &__button {
    padding: 0 12px;
    cursor: pointer;
    user-select: none;

    &--accept {
      margin-right: 8px;
    }
  }
}
</style>
