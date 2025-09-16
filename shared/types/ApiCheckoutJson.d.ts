interface Warning {
  membershipAvailable: { title: string; description: { primary: string, secondary: string } };
  gracePeriod: { title: string; description: string };
  koran: { title: string; description: string };
  voucher: { title: string; description: { loggedIn: string; guest: string } };
  partner: { title: string; description: { loggedIn: string; guest: string } };
}

interface AutoApplyRenewal {
  coupon_uuid: string;
  promotion_desc: {
    default: string;
    applied: string;
  };
}

interface PaymentOption {
  id: number;
  name: string;
  value: number;
  description?: string;
}

interface CheckoutJsonData {
  warning: Warning;
  auto_apply_renewal: AutoApplyRenewal;
  next_payment: {
    gopay: string;
    credit_card: string;
  };
  payment_options: PaymentOption[];
  payment_limit: {
    autorenewal: string[];
  };
}

interface CheckoutJsonResponse {
  data: CheckoutJsonData;
}

