import { Status } from "../pizza/slice";

export interface IPizzaInfo {
  category: number;
  id: string;
  imageUrl: string;
  price: number;
  rating: number;
  sizes: number[];
  title: string;
  types: number[];
}
export interface ICreateThunk {
  count: number;
  products: IPizzaInfo;
}
export interface IAboutSlice {
  pizza: IPizzaInfo;
  rating: number;
  loading: Status;
}
