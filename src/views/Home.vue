<template>
  <div class="home">
    <h1 class="home__title">妙法莲华经</h1>
    <h2 class="home__author">姚秦 · 三藏法师 · 鸠摩罗什 译</h2>

    <TableOfContents />
  </div>
</template>

<script>
// @ is an alias to /src
import TableOfContents from '@/components/TableOfContents.vue'

export default {
  name: 'home',
  components: {
    TableOfContents,
  },
}
</script>

<style lang="scss">
.home {
  &__title {
    font-size: 12vw;
    font-weight: normal;
    letter-spacing: 0.15em;
    text-align: center;
  }

  &__author {
    font-size: 1em;
    font-weight: normal;
    text-align: center;
  }
}
</style>
