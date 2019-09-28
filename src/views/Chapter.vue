<template>
  <div class="chapter">
    <router-link to="/">目录</router-link>

    <chapter-content :chapter-num="$route.params.chapter_num" />

    <router-link to="/">目录</router-link>
  </div>
</template>

<script>
import ChapterContent from '@/components/ChapterContent/ChapterContent'

export default {
  components: { ChapterContent },
}
</script>
