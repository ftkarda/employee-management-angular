import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-employee-filter',
  templateUrl: './employee-filter.component.html',
  styleUrls: ['./employee-filter.component.css'],
  standalone: false
})
export class EmployeeFilterComponent {
  @Input() groups: Group[] = [];
  @Input() searchTerm: string = '';
  @Input() selectedGroup: string = '';
  @Input() sortOption: string = 'latest';
  @Input() itemsPerPage: number = 10;

  @Output() searchChange = new EventEmitter<string>();
  @Output() groupChange = new EventEmitter<string>();
  @Output() sortOptionChange = new EventEmitter<string>();
  @Output() createEmployee = new EventEmitter<void>();

  onSearchChange(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onGroupChange(): void {
    this.groupChange.emit(this.selectedGroup);
  }

  applyFilters(): void {
    this.sortOptionChange.emit(this.sortOption);
  }

  addEmployee(): void {
    this.createEmployee.emit();
  }

  onSortChange(): void {
    this.sortOptionChange.emit(this.sortOption);
  }
}
