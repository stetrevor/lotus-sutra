<template>
  <ol class="table-of-contents">
    <li
      class="table-of-contents__item"
      v-for="(chapter, index) in chapters"
      :key="index"
    >
      <router-link :to="chapter.route">{{ chapter.title }}</router-link>
    </li>
  </ol>
</template>

<script>
import { titles } from '@/data.json'

export default {
  data() {
    return {
      chapters: titles.map((t, i) => ({
        route: `/chapter/${i + 1}`,
        title: t,
      })),
    }
  },
}
</script>

<style lang="scss">
.table-of-contents {
  margin: 0;
  margin-top: 1.999em;

  &__item {
    font-size: 0.707em;
    line-height: 2;
  }
}

@media screen and (min-width: 400px) {
  .table-of-contents {
    margin: 1em;
    margin-top: 1.999em;

    &__item {
      font-size: 1em;
    }
  }
}
</style>
