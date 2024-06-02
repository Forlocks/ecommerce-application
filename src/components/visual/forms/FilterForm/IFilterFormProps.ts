export interface IFilterFormProps {
  onFilterChange?: (
    colors: string[],
    styles: string,
    materials: string[],
    minPrice: number | null,
    maxPrice: number | null,
  ) => void;
}
