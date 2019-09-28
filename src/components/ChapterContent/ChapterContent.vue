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
        this.content = require(`./chapter-${newValue}.md`)
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
