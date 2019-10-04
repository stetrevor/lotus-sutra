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
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  border: 2px solid $color-accent;
  box-sizing: border-box;
  padding: 4px 12px;
  width: calc(100% - 24px * 2);
  max-width: $query-max-width - 24px * 2;
  height: 48px;
  box-shadow: 0 4px 4px rgba($color-accent, $alpha: 0.2);

  color: $color-primary-lightest;
  background-color: $color-accent;
  font-size: 0.5em;
  letter-spacing: 0.02em;
  line-height: 40px;

  display: flex;

  &__message {
    margin-right: auto;
  }

  &__button {
    padding: 0 12px;
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
    user-select: none;
  }
}
</style>
