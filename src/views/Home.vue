<template>
  <div class="home">
    <h1 class="title">妙法莲华经</h1>
    <h2 class="author">姚秦 · 三藏法师 · 鸠摩罗什 译</h2>

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
