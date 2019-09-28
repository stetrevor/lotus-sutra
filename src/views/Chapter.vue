<template>
  <div class="chapter">
    <router-link to="/">目录</router-link>

    <base-chapter :chapter-num="$route.params.chapter_num" />

    <router-link to="/">目录</router-link>
  </div>
</template>

<script>
import BaseChapter from '@/components/BaseChapter/BaseChapter'

export default {
  components: { BaseChapter },
}
</script>
