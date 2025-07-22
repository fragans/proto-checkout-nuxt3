<script lang="ts">
export default defineComponent({
  name: 'UiKompasBar',
  props: {
    isAbsolute: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: '#00559A',
    },
    bottom: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    fixed: {
      type: Boolean,
      default: false,
      required: false,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    tag: {
      type: String,
      default: 'header',
    },
    top: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { slots }) {
    const $style = useCssModule()

    const classes = computed(() => {
      let classes = [$style.base, $style.shadowMd]

      if (props.isAbsolute) {
        classes.push($style.posAbsolute)
      }

      if (props.dark) {
        classes.push($style.textWhite)
      }

      if (props.fixed) {
        classes.push($style.posFixed)
      }

      if (props.flat) {
        classes = classes.filter(className => className !== $style.shadowMd)
      }

      if (props.bottom && !props.top) {
        classes.push($style.bottom)
      }

      if (props.top && !props.bottom) {
        classes.push($style.top)
      }

      return classes
    })

    const styles = computed(() => {
      const backgroundColor = props.color ? props.color : 'transparent'

      return {
        backgroundColor,
      }
    })

    return () => h(
      props.tag, // type
      { class: classes.value,
        style: styles.value,
      }, // props
      slots.default ? slots.default() : [], // children
    )
  },
})
</script>

<style lang="postcss" module>
.base {
  width: 100%;
}

.bottom {
  left: 0px;
  bottom: 0px;
}

.posAbsolute {
  position: absolute;
}

.posFixed {
  position: fixed;
}

.textWhite {
  --tw-text-opacity: 1;
  color: rgba(243, 244, 246, var(--tw-text-opacity));
}

.top {
  left: 0px;
  top: 0px;
}

.shadowMd {
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
