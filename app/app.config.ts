export default defineAppConfig({
  toaster: {
    position: 'top-center' as const,
    expand: true,
    duration: 5000
  },
  ui: {
    colorMode: false,
    colors: {
      primary: 'blue'
    },
    input: {
      slots: {
        root: 'w-full',
      }
    },
    inputMenu: {
      slots: {
        root: 'w-full',
      }
    },
    formField: {
      slots: {
        root: 'w-full',
      }
    },
    textarea: {
      slots: {
        root: 'w-full',
      }
    },
    modal: {
      slots: {
        footer: 'flex justify-start',
      },
      variants: {
        fullscreen: {
          false: {
            content: 'max-w-2xl mx-auto',
          }
        }
      }
    },
    accordion: {
      slots: {
        root: 'w-full'
      },
      variants:{
        warning: {
          root: 'orange',
          trigger: 'neutral',
          
        }
      }
    },
  }
})