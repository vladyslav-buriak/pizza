import { Status } from "./slice";
export interface IFetchPizzasArgs {
    searchValue: string;
    sortBy: string;
    order: string;
    category: string;
    currentPage: number;
    limit: number;
  }
 export interface IPizzaItem {
    id: string;
    imageUrl: string;
    title: string;
    price: number;
    sizes: number[];
    types: number[];
  }
  
  export interface ICreateThunk {
    count: number;
    products: IPizzaItem[];
  }
  export interface IPizzasSliceState {
    pizzasItem: IPizzaItem[];
    amount: number;
    limit: number;
    loading: Status;
  }