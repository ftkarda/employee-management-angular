import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css'],
  standalone: false
})
export class EmployeeDetailComponent implements OnInit {
  employee: any = null;
  errorMessage: string | null = null;
  navigationState: {
    searchTerm?: string;
    selectedGroup?: string;
    currentPage?: number;
    sortOption?: string;
    itemsPerPage?: number;
  } = {};

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
    private location: Location
  ) {

  }

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');
    this.navigationState = history.state || {};

    if (employeeId === null) {
      this.errorMessage = 'Invalid employee ID.';
      return
    }

    this.getEmployeeById(employeeId)
  }

  goBack(): void {
    this.router.navigate(['/employees'], {
      state: this.navigationState
    });
  }

  getEmployeeById(employeeId: string | number) {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        this.employee = data;
      },
      (error) => {
        this.errorMessage = 'Error fetching employee data.';
      }
    );
  }
}
