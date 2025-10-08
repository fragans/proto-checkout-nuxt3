interface Address {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  province: string;
  city: string;
  district: string;
  village: string;
  postalCode: string;
  isDefault?: boolean;
  isJawaBali?: boolean;
}

interface Province {
  province: string;
  cities: City[];
}

interface City {
  city: string
  districts: District[]
}

interface District {
  district: string
  villages: Village[]
}

interface Village {
  village: string
}

interface IFakturPajak {
  npwp: string;
  name: string;
  address: string;
}

interface FormData extends Address {
  isInvoice?: boolean;
  invoice?: IFakturPajak;
  dateKoran?: string;
}
