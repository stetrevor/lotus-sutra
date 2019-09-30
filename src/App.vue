<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
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

@media screen and (max-width: 359px) {
  body {
    font-size: 26px;
    letter-spacing: 0.1em;
    line-height: 1.7;
  }
}

body {
  font-size: 26px;
  letter-spacing: 0.1em;
  line-height: 1.7;
}
</style>
