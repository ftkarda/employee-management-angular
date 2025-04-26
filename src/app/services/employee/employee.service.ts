import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { Group } from '../../models/group.model';

@Injectable({
  providedIn: 'root',
})

export class EmployeeService {
  private apiUrl = 'http://localhost:3000/employees';
  private groupApiUrl = 'http://localhost:3001/groups';

  constructor (
    private http: HttpClient 
  ) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: string | number): Observable<any > {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.apiUrl, employee);
  }

  updateEmployee(id: string | number, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(this.groupApiUrl);
  }

}