/* eslint-disable @typescript-eslint/no-unused-expressions */
import { KompasFooter, KompasHeaderAccount, KompasWidgetRecirculationsList } from '@kompasid/lit-web-components'

customElements.get('kompasid-footer') || customElements.define('kompasid-footer', KompasFooter)
customElements.get('kompasid-header-account') || customElements.define('kompasid-header-account', KompasHeaderAccount)
customElements.get('kompasid-widget-recirculations-list') || customElements.define('kompasid-widget-recirculations-list', KompasWidgetRecirculationsList)

export default defineNuxtPlugin(() => {
  // This is intentional
})
