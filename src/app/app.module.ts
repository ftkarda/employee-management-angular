import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routes';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './pages/employee-list/employee-list.component';
import { EmployeeFormComponent } from './pages/employee-form/employee-form.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';
import { EmployeeFilterComponent } from './components/employee-filter/employee-filter.component';
import { EmployeeTableComponent } from './components/employee-table/employee-table.component';
import { SharedInputsModule } from './components/shared/inputs/shared-inputs.module';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeFormComponent,
    LoginComponent,
    EmployeeDetailComponent,
    EmployeeFilterComponent,
    EmployeeTableComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedInputsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }