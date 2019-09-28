<template>
  <ol class="table-of-contents">
    <li v-for="(chapter, index) in chapters" :key="index">
      <router-link :to="chapter.route">{{ chapter.title }}</router-link>
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    const titles = [
      '序品第一',
      '方便品第二',
      '譬喻品第三',
      '信解品第四',
      '药草喻品第五',
      '授记品第六',
      '化城喻品第七',
      '五百弟子授记品第八',
      '授学无学人记品第九',
      '法师品第十',
      '见宝塔品第十一',
      '提婆达多品第十二',
      '劝持品第十三',
      '安乐行品第十四',
      '从地涌出品第十五',
      '如来寿量品第十六',
      '分别功德品第十七',
      '随喜功德品第十八',
      '法师功德品第十九',
      '常不轻菩萨品第廿',
      '如来神力品第廿一',
      '嘱累品第廿二',
      '药王菩萨本事品第廿三',
      '妙音菩萨品第廿四',
      '观世音菩萨普门品第廿五',
      '陀罗尼品第廿六',
      '妙庄严王本事品第廿七',
      '普贤菩萨劝发品第廿八',
    ]
    return {
      chapters: titles.map((t, i) => ({
        route: `/chapter/${i + 1}`,
        title: t,
      })),
    }
  },
}
</script>
