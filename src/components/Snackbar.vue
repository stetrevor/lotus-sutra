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
@import '@/scss/theme';

.snackbar {
  position: fixed;
  bottom: 64px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
  border: 2px solid $color-accent;
  box-sizing: border-box;
  padding: 4px 12px;
  width: calc(100% - 24px * 2);
  max-width: $query-max-width - 24px * 2;
  box-shadow: 0 4px 4px rgba($color-accent, $alpha: 0.2);

  color: $color-primary-lightest;
  background-color: $color-accent;
  font-size: 0.5em;
  letter-spacing: 0.02em;
  line-height: 40px;

  display: grid;
  grid-template-columns: 1fr max-content;
  gap: 8px;

  &__message {
    grid-column: 1 / 3;
  }

  &__button {
    padding: 0 12px;
    font-weight: bold;
    text-transform: capitalize;
    cursor: pointer;
    user-select: none;

    justify-self: end;

    &--accept {
      grid-column: 1;
    }

    &--cancel {
      grid-column: 2;
    }
  }
}

@include media-query-small {
  .snackbar {
    bottom: 0;
    left: 0;
    transform: none;
    border-radius: 4px 4px 0 0;
    width: 100%;
    min-width: $query-min-width;
    box-shadow: 0 -2px 4px rgba($color-accent, $alpha: 0.2);
  }
}
</style>
