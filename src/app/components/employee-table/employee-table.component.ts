import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.css'],
  standalone: false
})
export class EmployeeTableComponent {
  @Input() employees: Employee[] = [];
  @Input() searchTerm: string = '';
  @Input() selectedGroup: string = '';
  @Input() sortOption: string = 'latest';
  @Input() currentPage: number = 1;
  @Input() itemsPerPage: number = 10;
  @Input() itemsPerPageOptions = [5, 10, 25, 50];
  @Input() isUseAction = true;

  @Output() deleteEmployee = new EventEmitter<string | number>();
  @Output() editEmployee = new EventEmitter<string | number>();
  @Output() viewDetails = new EventEmitter<string | number>();
  @Output() prevPage = new EventEmitter<void>();
  @Output() nextPage = new EventEmitter<void>();

  onEditEmployee(id: string | number): void {
    this.editEmployee.emit(id);
  }

  onDeleteEmployee(id: string | number): void {
    this.deleteEmployee.emit(id);
  }

  onViewDetails(id: string | number): void {
    this.viewDetails.emit(id);
  }

  onPrevPage(): void {
    this.prevPage.emit();
  }

  onNextPage(): void {
    this.nextPage.emit();
  }

  get paginatedEmployees() {
    return this.employees.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  totalPages(): number {
    return Math.ceil(this.employees.length / this.itemsPerPage);
  }
}