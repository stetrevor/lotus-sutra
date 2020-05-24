<template>
  <div class="home">
    <h1 class="home__title">{{ sutraName }}</h1>

    <TableOfContents />

    <div class="home__continue-reading" v-if="chapterNum">
      <router-link :to="`/chapter/${chapterNum}?Y=${bookmarkY}`"
        >Continue reading ...</router-link
      >
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import TableOfContents from '@/components/TableOfContents.vue'
import { sutraName } from '@/data.json'

import { bookmark } from '@/storage'

export default {
  name: 'home',

  components: {
    TableOfContents,
  },

  data() {
    return {
      chapterNum: bookmark.getChapter(),
      bookmarkY: bookmark.getY(),
      sutraName,
    }
  },
}
</script>

<style lang="scss">
@import '@/scss/theme';

.home {
  margin: 1.999em 1em;

  &__title {
    font-size: (100vw / 10);
    font-weight: normal;
    letter-spacing: 0.15em;
    text-align: center;
  }

  &__author {
    font-size: 0.5em;
    font-weight: normal;
    text-align: center;
  }

  &__continue-reading {
    position: fixed;
    right: 0;
    bottom: 0;
    border-top-left-radius: 8px;
    padding: 8px 12px;
    font-size: 0.5em;
    letter-spacing: 0.01em;

    background-color: var(--color-accent);
    box-shadow: -1px -2px 4px rgba(var(--color-accent), 0.2);

    a {
      color: var(--color-primary-lightest);
    }
  }
}
</style>
