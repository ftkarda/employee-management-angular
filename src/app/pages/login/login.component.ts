import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { LoginRequest, LoginResponse } from '../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {
    
  }

  ngOnInit(): void {}

  async onSubmit(): Promise<void> {
    const loginRequest: LoginRequest = {
      username: this.username,
      password: this.password,
    };
    const result: LoginResponse = await this.authService.login(loginRequest);

    if (result.success) {
      this.router.navigate(['/employees']);
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}