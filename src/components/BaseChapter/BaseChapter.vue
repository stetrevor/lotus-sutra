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
        this.$nextTick(() => {
          const content = this.$el.querySelector('.base-chapter__content')
          this.readMinutes = `${Math.round(
            content.textContent.length / 250,
          )} min read`

          window.scrollTo(0, 0)
        })
      },
      immediate: true,
    },
  },

  data() {
    return {
      content: '',
      progress: '0%',
      readMinutes: '',
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

@media screen and (max-width: 359px) {
  .base-chapter {
    &__content {
      margin: 1.999em 0;
      font-size: 22px;

      h1 {
        margin-top: 0em;
        font-size: 1em;
        color: #72420e;
      }

      h2 {
        margin-bottom: 0.354em;
        font-size: 0.707em;
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
        grid-template-columns: repeat(2, max-content);
        gap: 0.1em 0.5em;
      }
    }
  }
}

@media screen and (min-width: 360px) and (max-width: 399px) {
  .base-chapter {
    &__content {
      margin: 1.999em 0;
      font-size: 22px;

      h1 {
        margin-top: 0em;
        font-size: 1em;
        color: #72420e;
      }

      h2 {
        margin-bottom: 0.354em;
        font-size: 0.707em;
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
        grid-template-columns: repeat(2, max-content);
        gap: 0.1em 0.5em;
      }
    }
  }
}

@media screen and (min-width: 400px) and (max-width: 479px) {
  .base-chapter {
    &__content {
      margin: 1.999em 0;
      font-size: 22px;

      h1 {
        margin-top: 0em;
        font-size: 1em;
        color: #72420e;
      }

      h2 {
        margin-bottom: 0.354em;
        font-size: 0.707em;
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
        grid-template-columns: repeat(2, max-content);
        gap: 0.1em 0.5em;
      }
    }
  }
}

@media screen and (min-width: 480px) and (max-width: 599px) {
  .base-chapter {
    &__content {
      margin: 1.999em 0;
      font-size: 22px;

      h1 {
        margin-top: 0em;
        font-size: 1em;
        color: #72420e;
      }

      h2 {
        margin-bottom: 0.354em;
        font-size: 0.707em;
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
        grid-template-columns: repeat(3, max-content);
        gap: 0.1em 0.5em;
      }
    }
  }
}
</style>
