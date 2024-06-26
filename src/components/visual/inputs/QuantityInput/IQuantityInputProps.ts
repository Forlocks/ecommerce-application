export interface IQuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}
