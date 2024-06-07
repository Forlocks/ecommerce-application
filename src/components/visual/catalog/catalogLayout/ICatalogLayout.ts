import { IPage } from '../../../../pages/IPage';

export interface ICatalogLayout extends IPage {
  onFilterChange?: (
    colors: string[],
    styles: string,
    materials: string[],
    minPrice: number | null,
    maxPrice: number | null,
    sortByPrice: string,
    sortByName: string,
    search: string,
  ) => void;
}
