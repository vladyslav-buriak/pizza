export interface IFilterSliceState {
    currentCat: number;
    currentPage: number;
    searchValue: string;
    currentSortBy: ICurrentSortBy;
  }
  
 export interface ICurrentSortBy {
    name: "популярністю" | "ціна" | "алфавітом";
    sortProps: string;
    sortOrder: string;
  }
  