<template>
  <div class="chapter-content" v-html="content"></div>
</template>

<script>
export default {
  props: {
    chapterNum: {
      type: [Number, String],
      required: true,
    },
  },

  watch: {
    chapterNum: {
      async handler(newValue) {
        const md = await import(`./chapter-${newValue}.md`)
        this.content = md.default
      },
      immediate: true,
    },
  },

  data() {
    return {
      content: '',
    }
  },
}
</script>
