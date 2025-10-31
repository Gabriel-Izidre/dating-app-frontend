export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectFieldProps {
  value?: string;
  options?: SelectOption[];
  placeholder?: string;
  onChange?: (value: string) => void;
}
