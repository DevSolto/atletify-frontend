import { City } from "./city";

export type Access = {
  id: string;
  userId: string;
  cityId: string;
  initialDate: string;
  finalDate: string | null;
  city: City;
};