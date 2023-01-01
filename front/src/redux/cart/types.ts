export interface ICartItem {
  count: number;
  title: string;
  price: number;
  id: string;
  types: string;
  sizes: number;
  imageUrl: string;
}

export interface ICartSliceState {
  totalPrice: number;
  items: ICartItem[];
}
