import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  }

  constructor(private http: HttpClient) { }

  registerUser(user: any) {
    return this.http.post('http://localhost:3000/api/register', user);
  }

}
