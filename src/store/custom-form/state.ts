export interface FormOptionsI {
  value: string | number | boolean | null;
  label: string;
}

export interface CustomFormStateI {
  value: string | number | boolean | null;
  name: string;
  label: string;
  type: string;
  required: boolean;
  readonly?: boolean;
  disabled?: boolean;
  rules?: string;
  placeholder?: string;
  error?: string;
  options?: FormOptionsI[];
  // show label default true
  showLabel?: boolean;
  query?: string;
  showOptions?: boolean;
}

export const state: CustomFormStateI[] = [];
