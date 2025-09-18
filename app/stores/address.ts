import { defineStore } from 'pinia'

export const useAddressStore = defineStore('address', {
  state: () => ({
    userProvince: '',
    shippingCost: 0,
    area: 0,
    isJawaBali: false,
    userDefaultAddress: {} as Address,
    userAddressList: [] as Address[],
    formData: {} as FormData,
    isInvoice: false,
    dateKoran: '',
    isProductKoran: false,
    detailProduct: {} as KdpProductDetail,
    addressId: 0,
    fakturPajak: {
      npwp: '',
      name: '',
      address: ''
    } as IFakturPajak,
    checkoutEmail: ''
  }),
  getters: {
  },
  actions: {
    reset() {
      this.userProvince = ''
      this.shippingCost = 0
      this.area = 0
      this.isJawaBali = false
      this.addressId = 0
      this.checkoutEmail = ''
    },
    setIsKoran(payload: boolean) {
      this.isProductKoran = payload
    },
    setIsInvoice(payload: boolean) {
      this.isInvoice = payload
    },
    setDateKoran(payload: string) {
      this.dateKoran = payload
    },
    resetFormData() {
      this.formData = {} as FormData
    },
    setDetailProduct(payload: KdpProductDetail) {
      this.detailProduct = payload
    },
    setProvince(payload: string) {
      this.userProvince = payload

      const jawaBaliProvinces = [
        'Banten',
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'Daerah Istimewa Yogyakarta',
        'Jawa Timur',
        'Bali'
      ]

      const isJawa = jawaBaliProvinces.slice(0, -1).includes(payload)
      const isBali = payload === 'Bali'

      this.area = isJawa ? 1 : isBali ? 2 : 3

      if (this.detailProduct.isVariant) {
        const variant = this.detailProduct.variants?.find(variant => variant.area === this.area)
        this.shippingCost = variant ? variant.shippingPrice : this.detailProduct.shippingPrice
      } else {
        this.shippingCost = this.detailProduct.shippingPrice
      }

      if (this.userProvince !== '') {
        if (jawaBaliProvinces.includes(payload)) {
          this.isJawaBali = true
        } else {
          this.isJawaBali = false
        }
      } else {
        this.isJawaBali = false
        this.shippingCost = 0
      }
    },
    setShippingCost(payload: number) {
      this.shippingCost = payload
    },
    setUserDefaultAddress(payload: Address) {
      this.userDefaultAddress = payload
    },
    setUserAddressList(payload: Address[]) {
      this.userAddressList = payload
    },
    setFormData(payload: FormData) {
      this.formData = payload
    },
    setFakturAddress(payload: Address) {
      const { address, village, district, city, province, postalCode } = payload
      this.fakturPajak.address = `${address}, ${village}, ${district}, ${city}, ${province}, ${postalCode}`
    },
    setAddressId(payload: number) {
      this.addressId = payload
    },
    setFakturPajak(payload: IFakturPajak) {
      this.fakturPajak = payload
    },
    setCheckoutEmail(payload: string) {
      this.checkoutEmail = payload
    }
  }
})
