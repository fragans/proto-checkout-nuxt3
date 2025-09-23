export interface Variant {
  id: number;
  area: number;
  price: number;
  shippingPrice: number;
}

export interface KdpProductDetail {
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

export interface Coupons {
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
