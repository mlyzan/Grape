import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor() {}
  public isAuthenticated(): boolean {
    const userId = localStorage.getItem('userId');
    return !!userId;
  }
}