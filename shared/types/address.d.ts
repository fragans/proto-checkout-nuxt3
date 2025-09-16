interface Address {
  id?: number;
  firstName: string;
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
  id: string;
  name: string;
  cities: City[];
}

interface City {
  id: string;
  name: string;
  districts: District[];
}

interface District {
  id: string;
  name: string;
  villages: Village[];
}

interface Village {
  id: string;
  name: string;
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
