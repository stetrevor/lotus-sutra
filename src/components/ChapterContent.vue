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
      handler(newValue) {
        this.content = this.getData(newValue)
      },
      immediate: true,
    },
  },

  methods: {
    getData(newValue) {
      return `<h1>Got Content</h1><p>Chapter ${newValue} </p>`
    },
  },

  data() {
    return {
      content: '',
    }
  },
}
</script>
