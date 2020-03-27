import { Injectable } from '@angular/core';
import { Sitter } from './sitter.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SitterService {
  constructor(private http: HttpClient) {}

  saveSitter(sitter: Sitter) {
    return this.http.post<Sitter>('http://localhost:3000/api/sitter', sitter);
  }
}