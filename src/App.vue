<template>
  <div id="app">
    <router-view />
  </div>
</template>

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
    background-color: violet;
    font-size: $font-size-min;
    letter-spacing: width($font-size-min, $letter-spacing);
  }
}

@include media-query-medium {
  body {
    // background-color: aqua;
    font-size: $font-size-medium;
    letter-spacing: width($font-size-medium, $letter-spacing);
  }
}

@include media-query-large {
  body {
    background-color: yellow;
    font-size: $font-size-max;
    letter-spacing: width($font-size-max, $letter-spacing);
  }
}
</style>
