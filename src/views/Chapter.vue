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

export default {
  components: { BaseChapter },

  computed: {
    chapterNum() {
      return parseInt(this.$route.params.chapter_num)
    },
  },
}
</script>

<style lang="scss">
@media screen and (max-width: 359px) {
  .chapter {
    margin: 1.999em 1em;

    &__nav {
      display: flex;
      align-content: space-between;

      a {
        flex-grow: 1;
        text-align: center;
      }
    }
  }
}

@media screen and (min-width: 360px) and (max-width: 399px) {
  .chapter {
    margin: 1.999em 1em;

    &__nav {
      display: flex;
      align-content: space-between;

      a {
        flex-grow: 1;
        text-align: center;
      }
    }
  }
}
</style>
