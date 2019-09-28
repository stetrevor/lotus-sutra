<template>
  <div class="base-chapter">
    <div class="base-chapter__content" v-html="content"></div>

    <div class="base-chapter__reading-progress">
      <div class="base-chapter__text-hint">
        <div class="base-chapter__progress">{{ progress }}</div>
        <div class="base-chapter__read-time">{{ readMinutes }}</div>
      </div>
      <div class="base-chapter__progress-bar"></div>
    </div>
  </div>
</template>

<script>
function rafThrottle(fn) {
  let busy = false

  return function() {
    if (busy) return

    busy = true
    fn.apply(this, arguments)
    window.requestAnimationFrame(function() {
      busy = false
    })
  }
}

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

  computed: {
    readMinutes() {
      return `${Math.round(this.content.length / 250)} min read`
    },
  },

  data() {
    return {
      content: '',
      progress: '0%',
    }
  },

  methods: {
    updateProgress() {
      const de = document.documentElement
      const scrollTop = de.scrollTop
      const scrollBottom = de.scrollHeight - de.clientHeight
      const scrollPercent = (scrollTop / scrollBottom) * 100
      this.$el
        .querySelector('.base-chapter__progress-bar')
        .style.setProperty('--scroll', scrollPercent + '%')
      this.progress = Math.ceil(scrollPercent) + '%'
    },
  },

  mounted() {
    document.addEventListener('scroll', rafThrottle(this.updateProgress), {
      passive: true,
    })
  },

  beforeDestroy() {
    document.removeEventListener('scroll', rafThrottle(this.updateProgress))
  },
}
</script>

<style lang="scss">
.base-chapter {
  position: relative;

  &__content {
    margin: 2.827em 1em;

    h1 {
      font-size: 1.414em;
      font-weight: normal;
      color: #72420e;
    }

    h2 {
      font-size: 1em;
      font-weight: normal;
    }

    p {
      font-size: 1em;
      margin-bottom: 1.414em;
    }

    .commentary {
      margin-bottom: 1.414em;
      font-size: 1em;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(5em, 1fr));
      gap: 0 8px;
    }
  }

  &__reading-progress {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    font-size: 12px;
    letter-spacing: 0;
    background-color: #f7ebde;
  }

  &__text-hint {
    margin: 4px 24px;
    display: flex;
    justify-content: space-between;
  }

  &__progress-bar {
    height: 4px;
    --scroll: 0%;
    background: linear-gradient(to right, #c13a3a var(--scroll), transparent 0);
  }
}
</style>
