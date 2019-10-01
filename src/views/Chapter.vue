<template>
  <div class="chapter">
    <div class="chapter__nav">
      <router-link :to="`/chapter/${chapterNum - 1}`" v-if="chapterNum > 1"
        >上一章</router-link
      >
      <router-link to="/">目录</router-link>
      <router-link :to="`/chapter/${chapterNum + 1}`" v-if="chapterNum < 28"
        >下一章</router-link
      >
    </div>

    <base-chapter :chapter-num="chapterNum" />

    <div class="chapter__nav">
      <router-link :to="`/chapter/${chapterNum - 1}`" v-if="chapterNum > 1"
        >上一章</router-link
      >
      <router-link to="/">目录</router-link>
      <router-link :to="`/chapter/${chapterNum + 1}`" v-if="chapterNum < 28"
        >下一章</router-link
      >
    </div>
  </div>
</template>

<script>
import BaseChapter from '@/components/BaseChapter/BaseChapter'

import { bookmark } from '@/storage'

export default {
  name: 'chapter',

  components: { BaseChapter },

  computed: {
    chapterNum() {
      return parseInt(this.$route.params.chapter_num)
    },
  },

  methods: {
    saveBookmarkChapter(chapterNum) {
      bookmark.setChapter(chapterNum)
    },
  },

  beforeRouteEnter(to, from, next) {
    next(vm => vm.saveBookmarkChapter(to.params.chapter_num))
  },

  beforeRouteUpdate(to, from, next) {
    this.saveBookmarkChapter(to.params.chapter_num)
    next()
  },
}
</script>

<style lang="scss">
@import '@/scss/_mixins';

.chapter {
  margin: 1.999em 0;

  &__nav {
    display: flex;
    align-content: space-between;

    a {
      flex-grow: 1;
      text-align: center;
    }
  }
}

@include media-query-small {
  .chapter {
    margin-left: width($font-size-min, $margin-lr);
    margin-right: width($font-size-min, $margin-lr);
  }
}

@include media-query-medium {
  .chapter {
    margin-left: width($font-size-medium, $margin-lr);
    margin-right: width($font-size-medium, $margin-lr);
  }
}

@include media-query-large {
  .chapter {
    margin-left: width($font-size-max, $margin-lr);
    margin-right: width($font-size-max, $margin-lr);
  }
}
</style>
