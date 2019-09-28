<template>
  <div class="chapter">
    <h1>This is chapter {{ $route.params.chapter_num }}</h1>

    <chapter-content :chapter-num="$route.params.chapter_num" />
  </div>
</template>

<script>
import ChapterContent from '@/components/ChapterContent'
export default {
  components: { ChapterContent },
}
</script>
