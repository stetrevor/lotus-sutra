<template>
  <div id="app">
    <router-view />

    <snackbar
      v-if="prompt"
      message="New version found. Refresh to upgrade?"
      accept-text="refresh"
      cancel-text="later"
      @snackbar-accept="reload"
      @snackbar-cancel="prompt = false"
    />
  </div>
</template>

<script>
import Snackbar from '@/components/Snackbar'

import { Workbox } from 'workbox-window'

export default {
  components: { Snackbar },

  created() {
    if ('serviceWorker' in navigator) {
      const wb = new Workbox(`${process.env.BASE_URL}service-worker.js`)

      wb.addEventListener('waiting', () => {
        this.prompt = true
      })

      wb.addEventListener('controlling', () => window.location.reload())

      wb.register()

      this.wb = wb
    }
  },

  methods: {
    async reload() {
      this.prompt = false

      await this.wb.messageSW({ type: 'SKIP_WAITING' })
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
@import '@/scss/_mixins';

/* colors and font family
 */
body {
  margin: 0; // reset body margin
  // margin: 2.827em 1.999em;
  color: #905c21; /* grizzly */
  background-color: #f7ebde; /* moccasin */
  // font-size: 14px;
  // line-height: 1.6;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::selection {
  background-color: #905c21; /* grizzly */
  color: #f7ebde; /* moccasin */
}

a {
  // font-size: 1.414em;
  color: #905c21;
  text-decoration: none;
}

a.router-link-exact-active,
a:visited {
  color: #c13a3a;
}

body {
  line-height: 1.7;
  min-width: $query-min-width;
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
</style>
