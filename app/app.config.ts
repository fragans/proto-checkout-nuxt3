export default defineAppConfig({
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
    }
  }
})