<template>
  <div id="app" :class="{ 'dark-mode': $darkMode }">
    <router-view />

    <snackbar
      v-if="prompt"
      message="New version found. Refresh to upgrade?"
      accept-text="Update"
      cancel-text="later"
      @snackbar-accept="reload"
      @snackbar-cancel="prompt = false"
    />
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'

export default {
  components: { Snackbar },

  created() {
    if (this.$workbox) {
      this.$workbox.addEventListener('waiting', () => {
        this.prompt = true
      })
    }
  },

  methods: {
    async reload() {
      this.prompt = false

      await this.$workbox.messageSW({ type: 'SKIP_WAITING' })
    },
  },

  data() {
    return {
      prompt: false,
    }
  },
}
</script>

<style lang="scss">
@import '@/scss/theme';

/* colors and font family
 */
body {
  margin: 0; // reset body margin
  line-height: 1.7;
  min-width: $query-min-width;
  color: var(--color-primary);
  background-color: var(--color-primary-lightest);
}

@include media-query-small {
  body {
    font-size: $font-size-min;
    letter-spacing: width($font-size-min, $letter-spacing);
  }
}

@include media-query-medium {
  body {
    font-size: $font-size-medium;
    letter-spacing: width($font-size-medium, $letter-spacing);
  }
}

@include media-query-large {
  body {
    font-size: $font-size-max;
    letter-spacing: width($font-size-max, $letter-spacing);
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: var(--color-primary);
  color: var(--color-primary-lightest);
}

a {
  color: var(--color-primary);
  text-decoration: none;

  &.router-link-exact-active,
  &:visited {
    color: var(--color-accent);
  }
}
</style>
