
import { InputFieldType } from "../enum/input-field-type.enum";
import { InputFieldInterface } from "../interface/input-field.interface";


export const formSchema: { [key: string]: InputFieldInterface } = {
  username: {
    id: 'username',
    label: 'Username',
    placeholder: 'Enter username',
    type: InputFieldType.TEXT,
    value: '',
    required: true,
    validation: { message: "", error: false }
  },
  firstName: {
    id: 'firstName',
    label: 'First Name',
    placeholder: 'Enter first name',
    type: InputFieldType.TEXT,
    value: '',
    required: true,
    validation: { message: "", error: false }
  },
  lastName: {
    id: 'lastName',
    label: 'Last Name',
    placeholder: 'Enter last name',
    type: InputFieldType.TEXT,
    value: '',
    required: true,
    validation: { message: "", error: false }
  },
  email: {
    id: 'email',
    label: 'Email',
    placeholder: 'Enter email',
    type: InputFieldType.TEXT,
    value: '',
    required: true,
    validation: { message: "", error: false }
  },
  status: {
    id: 'status',
    label: 'Status',
    placeholder: 'Select status',
    type: InputFieldType.SELECT,
    value: '',
    required: true,
    options: [],
    validation: { message: "", error: false }
  },
  group: {
    id: 'group',
    label: 'Group',
    placeholder: 'Select group',
    type: InputFieldType.SELECT,
    value: '',
    required: true,
    options: [],
    validation: { message: "", error: false }
  },
  birthDate: {
    id: 'birthDate',
    label: 'Birth Date',
    placeholder: 'Select birth date',
    type: InputFieldType.DATE,
    value: '',
    required: true,
    validation: { message: "", error: false }
  },
  basicSalary: {
    id: 'basicSalary',
    label: 'Basic Salary',
    placeholder: 'Enter Basic salary',
    type: InputFieldType.NUMBER,
    value: '',
    required: true,
    min: 0,
    max: 100000,
    validation: { message: "", error: false }
  },
  description: {
    id: 'description',
    label: 'Description',
    placeholder: 'Enter description',
    type: InputFieldType.TEXTAREA,
    value: '',
    required: true,
    validation: { message: "", error: false }
  }
};