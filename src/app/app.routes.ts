import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages//employee-form/employee-form.component';
import { AuthGuard } from './services/auth/guard/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'employees',
    component: EmployeeListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-detail/:id',
    component: EmployeeDetailComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-form',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'employee-form/:id',
    component: EmployeeFormComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }