import { Injectable } from '@angular/core';
import { Sitter, Comment } from './sitter.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SitterService {
  constructor(private http: HttpClient) {}

  saveSitter(sitter: Sitter): Observable<Sitter> {
    return this.http.post<Sitter>('http://localhost:3000/api/sitter', sitter);
  }

  getSitters(): Observable<Sitter[]> {
    return this.http.get<Sitter[]>('http://localhost:3000/api/sitter');
  }

  deleteSitter(id: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/api/sitter/${id}`);
  }

  updateSitter(id: string, sitter: object): Observable<object> {
    return this.http.put<object>(`http://localhost:3000/api/sitter/${id}`, sitter);
  }

  addComment(comment: object): Observable<object> {
    return this.http.post<object>('http://localhost:3000/api/comment', comment);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:3000/api/comment');
  }

}