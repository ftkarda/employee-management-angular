import { Injectable } from '@angular/core';
import axios from 'axios';
import { LoginRequest, LoginResponse } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedInStatus = false;
  private baseUrl = 'http://localhost:3002/users';

  constructor() {
    
  }

  async login(login: LoginRequest): Promise<LoginResponse> {
    if (!login.username || !login.password) {
      return { success: false };
    }
    
    try {
      const response = await axios.get(`${this.baseUrl}?username=${login.username}&password=${login.password}`);
      const users = response.data;
      if (users.length > 0) {
        this.isLoggedInStatus = true;
        return { success: true, user: users[0] };
      } else {
        return { success: false };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false };
    }
  }

  logout(): void {
    this.isLoggedInStatus = false;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }
}