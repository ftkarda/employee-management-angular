import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { Group } from '../../models/group.model';
import { InputFieldInterface } from '../../models/interface/input-field.interface';
import { formSchema } from '../../models/schema/form.schema';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: false
})
export class EmployeeFormComponent implements OnInit {
  employeePayload: Employee = {
    id: "",
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    basicSalary: 0,
    status: '',
    group: '',
    description: ''
  };
  schema = formSchema;

  groups: Group[] = [];
  status = ['Active', 'Inactive', 'On Leave', 'Suspended'];
  navigationState: {
    searchTerm?: string;
    selectedGroup?: string;
    currentPage?: number;
    sortOption?: string;
    itemsPerPage?: number;
  } = {};
  employeeId: string | null = ""
  loading: boolean = false;
  validForm: boolean = true;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  async ngOnInit(): Promise<void> {
    this.navigationState = history.state || {};
    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.getGroups()
    this.getStatus()

    if (this.employeeId) {
      await this.loadEmployee(this.employeeId);
    } else {
      this.resetForm();
    }
  }

  resetForm(): void {
    Object.keys(this.schema).forEach(field => {
      this.setFieldValue(field, "");
    });
  }

  formatDate(isoDate: string): string {
    return new Date(isoDate).toISOString().split('T')[0];
  }

  getFieldValue(fieldKey: string) {
    return this.schema[fieldKey].value;
  }

  setFieldValue(fieldKey: string, value: any): void {
    this.schema[fieldKey].value = value;
  }

  async loadEmployee(id: string | number): Promise<void> {
    try {
      const data = await this.employeeService.getEmployeeById(id).toPromise();

      this.setFieldValue('username', data.username);
      this.setFieldValue('firstName', data.firstName);
      this.setFieldValue('lastName', data.lastName);
      this.setFieldValue('email', data.email);
      this.setFieldValue('status', data.status);
      this.setFieldValue('group', data.group);
      this.setFieldValue('birthDate', data.birthDate);
      this.setFieldValue('basicSalary', data.basicSalary);
      this.setFieldValue('description', data.description);

      if (this.schema['birthDate'].value) {
        this.schema['birthDate'].value = this.formatDate(this.schema['birthDate'].value);
      }
    } catch (error) {
      console.error('error load employees', error);
    }
  }

  saveEmployee(): void {
    if (!this.validateForm(this.schema)) {
      return;
    }

    if (this.employeeId) {
      this.updateEmployee();
    } else {
      this.createEmployee();
    }
  }

  validateForm(schema: { [key: string]: InputFieldInterface }): boolean {
    let isValid = true;

    for (const key in schema) {
      const field = schema[key];
      const value = field.value;
      let errorMessage = '';

      if (field.required && (!value || value.toString().trim() === '')) {
        errorMessage = `${field.label} is required`;
        isValid = false;
      } else if (field.id === 'email' && value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
          errorMessage = `Invalid email format`;
          isValid = false;
        }
      }

      schema[key].validation = {
        error: !!errorMessage,
        message: errorMessage
      };
    }

    return isValid;
  }

  createEmployee(): void {
    this.setEmployeePayload()
    let newPayload = this.insertCreatedDate('Add')

    this.employeeService.createEmployee(newPayload).subscribe(() => {
      this.router.navigate(['/employees'], {
        state: this.navigationState
      });
    });
  }

  updateEmployee(): void {
    if (this.employeeId) {
      this.setEmployeePayload()
      let newPayload = this.insertCreatedDate('Edit')

      this.employeeService.updateEmployee(this.employeeId, newPayload).subscribe(() => {
        this.router.navigate([`/employees`], {
          state: this.navigationState
        });
      });
    }
  }

  insertCreatedDate(Add: string) {
    let createDate = new Date().toISOString()

    let newPayload = {
      ...this.employeePayload,
      createdDate: createDate
    };

    if (Add === 'Add') {
      delete newPayload.id;
      return newPayload
    }

    return newPayload
  }

  setEmployeePayload() {
    Object.keys(this.schema).forEach((fieldSchema: any) => {
      Object.keys(this.employeePayload).forEach((fieldEmployee: any) => {
        if (fieldEmployee === fieldSchema) {
          (this.employeePayload as any)[fieldEmployee] = this.schema[fieldSchema].value;
        }
      })
    })
  }

  getGroups() {
    this.schema['group'].options = []
    this.employeeService.getGroups().subscribe(
      (data) => {
        data.forEach(res => {
          this.schema['group'].options.push({ name: res.name, value: res.name });
        });

      },
      (error) => {
        console.error('error get group', error);

      }
    );
  }

  getStatus() {
    this.schema['status'].options = []

    this.status.forEach(res => {
      this.schema['status'].options.push({ name: res, value: res });
    });
  }

  goBack(): void {
    this.router.navigate(['/employees'], {
      state: this.navigationState
    });
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}