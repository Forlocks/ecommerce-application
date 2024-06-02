export interface IProductList {
  selectedColors: string[];
  selectedStyle: string;
  selectedMaterials: string[];
  minPrice: number | null;
  maxPrice: number | null;
  sortByPrice: string;
  sortByName: string;
}
