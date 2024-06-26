export interface IMinMaxPriceFieldProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onEnterPress: () => void;
  minPriceError?: string;
  maxPriceError?: string;
}
