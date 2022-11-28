import { Coordinates } from "./coordinates";

export type CompanyAddress = {
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  zipcode: string;
  city: string;
  state: string;
  country: string;
  coordinates?: Coordinates;
};
