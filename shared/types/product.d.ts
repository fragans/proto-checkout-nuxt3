interface Variant {
  area: number;
  id: number;
  normalPrice: number;
  price: number;
  shippingPrice: number;
}

interface KdpProductDetail {
  id: number;
  author: string;
  title: string;
  price: number;
  shippingPrice: number;
  duration: number;
  durationType: number;
  createdAt: string;
  modifiedAt: string;
  isProductVoucher: boolean;
  isProductVoucherAvailable: boolean;
  isPartnerSubs: boolean;
  isKoran: boolean;
  isVariant: boolean;
  variants: Variant[];
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
