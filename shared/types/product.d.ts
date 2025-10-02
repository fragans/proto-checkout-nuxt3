interface Variant {
  area: number;
  id: number;
  normalPrice: number;
  price: number;
  shippingPrice: number;
}

interface KdpProductDetail {
  id: number
  author: string
  title: string
  price: number
  shippingPrice: number
  duration: number // satuan berdasarkan durationType
  durationType: number // 1 = hour 2 = day 3 = month 4 = year
  isKoran: boolean
  isPartnerSubs: boolean
  isVariant: boolean
  productVariantPrice: null
  createdAt: string
  modifiedAt: string
  isProductVoucher: boolean
  isProductVoucherAvailable: boolean
  variants: Array<Variants> | null
  //unknown??
  membershipPlanId: number
  //baru
  oneTimePrice: number
  introPrice: number
  introDuration: number
  autorenPrice: number
}

interface Coupons {
  id: number;
  code: string;
  description: string;
  type: 'percentage' | 'pricecut';
  typeValue: number;
  maximumDiscount: number;
  paymentMethod: string[] | null;
  term: string[];
  status?: boolean;
}
