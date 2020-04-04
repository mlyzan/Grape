import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from './user.interfaces';
import { Observable } from 'rxjs';

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

  registerUser(user: User): Observable<object> {
    return this.http.post<object>('http://localhost:3000/api/register', user);
  }

  loginUser(authCredentials): Observable<object> {
    return this.http.post<object>('http://localhost:3000/api/authenticate', authCredentials);
  }
  
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/api/user/${id}`);
  }
}