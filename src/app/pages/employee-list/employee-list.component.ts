import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { AuthService } from '../../services/auth/auth.service';
import { Group } from '../../models/group.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: false
})

export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  groups: Group[] = [];
  searchTerm: string = '';
  selectedGroup: string = '';
  sortOption: string = 'latest';
  filteredEmployees: Employee[] = [];
  itemsPerPage = 10;
  currentPage = 1;
  itemsPerPageOptions = [5, 10, 25, 50];

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    const navState = history.state;

    if (navState) {
      this.searchTerm = navState.searchTerm || '';
      this.selectedGroup = navState.selectedGroup || '';
      this.currentPage = navState.currentPage || 1;
      this.sortOption = navState.sortOption || 'latest';
      this.itemsPerPage = navState.itemsPerPage || 10;
    }

    this.loadEmployees();
    this.loadGroups();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
      this.applyFilters();
    });
  }

  loadGroups(): void {
    this.employeeService.getGroups().subscribe(data => this.groups = data);
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onGroupChange(group: string): void {
    this.selectedGroup = group;
    this.applyFilters();
  }

  async applyFilters() {
    this.filteredEmployees = this.employees.filter(employee => {
      const matchesGroup = this.selectedGroup ? employee.group === this.selectedGroup : true;
      const matchesSearch = employee.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(this.searchTerm.toLowerCase());
      return matchesGroup && matchesSearch;
    });

    await this.sortEmployees();
  }

  async sortEmployees() {
    switch (this.sortOption) {
      case 'nameAsc':
        this.filteredEmployees.sort((a, b) => a.firstName.localeCompare(b.firstName));
        break;
      case 'nameDesc':
        this.filteredEmployees.sort((a, b) => b.firstName.localeCompare(a.firstName));
        break;
      case 'salaryAsc':
        this.filteredEmployees.sort((a, b) => a.basicSalary - b.basicSalary);
        break;
      case 'salaryDesc':
        this.filteredEmployees.sort((a, b) => b.basicSalary - a.basicSalary);
        break;
      case 'oldest':
        this.filteredEmployees.sort(this.sortByOldestDate);
        break;
      case 'latest':
      default:
        this.filteredEmployees.sort(this.sortByLatestDate);
        break;
    }
  }

  sortByOldestDate(a: Employee, b: Employee): number {
    const aDate = a.createdDate ? new Date(a.createdDate).getTime() : 0;
    const bDate = b.createdDate ? new Date(b.createdDate).getTime() : 0;
    return aDate - bDate;
  }

  sortByLatestDate(a: Employee, b: Employee): number {
    const aDate = a.createdDate ? new Date(a.createdDate).getTime() : 0;
    const bDate = b.createdDate ? new Date(b.createdDate).getTime() : 0;
    return bDate - aDate;
  }

  onSortChange(option: string): void {
    this.sortOption = option;
    this.applyFilters();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.loadEmployees();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEmployees();
    }
  }

  totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

  deleteEmployee(id: string | number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => this.loadEmployees());
    }
  }

  logout(): void {
    if (confirm('Are you sure want to logout?')) { 
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  viewDetails(employeeId: string | number): void {
    this.router.navigate([`/employee-detail/${employeeId}`], {
      state: {
        searchTerm: this.searchTerm,
        selectedGroup: this.selectedGroup,
        currentPage: this.currentPage,
        sortOption: this.sortOption,
        itemsPerPage: this.itemsPerPage
      }
    });
  }

  editEmployee(id: string | number): void {
    this.router.navigate([`/employee-form/${id}`], {
      state: {
        searchTerm: this.searchTerm,
        selectedGroup: this.selectedGroup,
        currentPage: this.currentPage,
        sortOption: this.sortOption,
        itemsPerPage: this.itemsPerPage
      }
    });
  }

  createEmployee(): void {
    this.router.navigate(['/employee-form'], {
      state: {
        searchTerm: this.searchTerm,
        selectedGroup: this.selectedGroup,
        currentPage: this.currentPage,
        sortOption: this.sortOption,
        itemsPerPage: this.itemsPerPage
      }
    });
  }
}