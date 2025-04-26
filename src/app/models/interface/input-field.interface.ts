import { InputFieldType } from "../enum/input-field-type.enum";

export interface InputFieldInterface {
  id: string;
  label: string;
  placeholder: string;
  type: InputFieldType
  value: any;
  required: boolean;
  validation: {
    message: string;
    error: boolean;
  };
  options?: any;
  min?: number;
  max?: number;
}