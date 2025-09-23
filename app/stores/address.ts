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
    addressId: 0,
    fakturPajak: {
      npwp: '',
      name: '',
      address: ''
    } as IFakturPajak,
    checkoutEmail: '',
    openModalInputAddress: false,
    openModalListAddress: false,
    openModalEditAddress: false,
    provinceList: [] as Province[],
    isGuestAddress: false,
    // ini knp nebeng di store address?
    detailProduct: null as null | KdpProductDetail
  }),
  getters: {
    getDefaultAddress(state): Address | undefined{
      const [first] = state.userAddressList
      if (state.userAddressList.length > 0 && state.isGuestAddress) {
        return first  
      }
      const userAddress = state.userAddressList.find(item => item.isDefault === true)
      if (!userAddress) return first
      return userAddress  
    },
    isShippingAddressInvalid(state): boolean {
      if (!state.detailProduct) return false
      const variants = state.detailProduct.variants
      if (variants.length === 0) return false
      return !variants.some(variant => variant.area === this.area)
    },
    isAddressFull (state): boolean {
      return state.userAddressList.length <= 5
    },
    getValidAreaInfo(state): string {
      if (!state.detailProduct?.variants) { return '' }

      const areas = state.detailProduct.variants.map(variant => variant.area)

      let validArea:string = ''
      
      if (areas.includes(1) && areas.includes(2) && areas.includes(3)) {
        validArea = 'Pulau Jawa, Pulau Bali, Luar Pulau Jawa & Bali'
      } else if (areas.includes(1) && areas.includes(2)) {
        validArea = 'Pulau Jawa & Bali'
      } else if (areas.includes(1) && areas.includes(3)) {
        validArea = 'Pulau Jawa, Luar Pulau Jawa & Bali'
      } else if (areas.includes(2) && areas.includes(3)) {
        validArea = 'Pulau Bali, Luar Pulau Jawa & Bali'
      } else if (areas.includes(1)) {
        validArea = 'Pulau Jawa'
      } else if (areas.includes(2)) {
        validArea = 'Pulau Bali'
      } else if (areas.includes(3)) {
        validArea = 'Luar Pulau Jawa & Bali'
      }

      return validArea
    }
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
    setProvinceList(payload: Province[]) {
      this.provinceList = payload
    },
    handleProvinceChange(payload: string| undefined) {
      const jawaBaliProvinces = [
        'Banten',
        'DKI Jakarta',
        'Jawa Barat',
        'Jawa Tengah',
        'Daerah Istimewa Yogyakarta',
        'Jawa Timur',
        'Bali'
      ]
      if (!payload) {
        this.isJawaBali = false
        this.shippingCost = 0
        return
      }
      
      if (jawaBaliProvinces.includes(payload)) {
        this.isJawaBali = true
      } else {
        this.isJawaBali = false
      }
      const isJawa = jawaBaliProvinces.slice(0, -1).includes(payload)
      const isBali = payload === 'Bali'

      this.area = isJawa ? 1 : isBali ? 2 : 3

      if (this.detailProduct?.isVariant) {
        const variant = this.detailProduct.variants?.find(variant => variant.area === this.area)
        this.shippingCost = variant ? variant.shippingPrice : this.detailProduct.shippingPrice
      } else {
        this.shippingCost = this.detailProduct?.shippingPrice ?? 0
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
    },
    getAddressString (addressObject: Address| undefined) {
      if (!addressObject) return ''
      const {
        address: stringAddress,
        village,
        district,
        city,
        province,
        postalCode
      } = addressObject
      return `${stringAddress}, ${village}, ${district}, ${city}, ${province}, ${postalCode}`
    },
    setValidArea (areas: number[]) {
    let validArea = ''
    if (areas.includes(1) && areas.includes(2) && areas.includes(3)) {
      validArea = 'Pulau Jawa, Pulau Bali, Luar Pulau Jawa & Bali'
    } else if (areas.includes(1) && areas.includes(2)) {
      validArea = 'Pulau Jawa & Bali'
    } else if (areas.includes(1) && areas.includes(3)) {
      validArea = 'Pulau Jawa, Luar Pulau Jawa & Bali'
    } else if (areas.includes(2) && areas.includes(3)) {
      validArea = 'Pulau Bali, Luar Pulau Jawa & Bali'
    } else if (areas.includes(1)) {
      validArea = 'Pulau Jawa'
    } else if (areas.includes(2)) {
      validArea = 'Pulau Bali'
    } else if (areas.includes(3)) {
      validArea = 'Luar Pulau Jawa & Bali'
    }

    return validArea
  }
  }
})
