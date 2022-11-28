import { CompanyAddress } from "./company-address";
import { LaundryPreferences } from "./laundry-preferences";

export type LaundrySolicitation = {
  ownerName: string;
  ownerCpf: string;
  phoneNumber: string;
  email: string;
  cnpj: string;
  corporateName: string;
  fantasyName: string;
  displayName: string;
  address: CompanyAddress;
  laundryPreferences: LaundryPreferences;
};
