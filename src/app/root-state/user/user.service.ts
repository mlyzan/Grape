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
    password: '',
    updateInfo: null
  }

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<object> {
    return this.http.post<object>('https://safe-sea-95431.herokuapp.com/api/register', user);
  }

  loginUser(authCredentials): Observable<object> {
    return this.http.post<object>('https://safe-sea-95431.herokuapp.com/api/authenticate', authCredentials);
  }
  
  getUser(id: string): Observable<User> {
    return this.http.get<User>(`https://safe-sea-95431.herokuapp.com/api/user/${id}`);
  }
  
  updateProfile(obj: any, id: string): Observable<any> {
    return this.http.post<any>(`https://safe-sea-95431.herokuapp.com/api/profile-update/${id}`, obj);
  }
}