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
.chapter {
  &__nav {
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;

    a {
      flex-grow: 1;
      width: max-content;
    }
  }
}
</style>
