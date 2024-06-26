export interface ICheckboxProps {
  label: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  disabled?: boolean;
}
