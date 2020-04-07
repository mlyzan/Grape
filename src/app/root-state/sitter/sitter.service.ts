import { Injectable } from '@angular/core';
import { Sitter, Comment } from './sitter.interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SitterService {
  constructor(private http: HttpClient) {}

  saveSitter(sitter: Sitter): Observable<Sitter> {
    return this.http.post<Sitter>('https://safe-sea-95431.herokuapp.com/api/sitter', sitter);
  }

  getSitters(): Observable<Sitter[]> {
    return this.http.get<Sitter[]>('https://safe-sea-95431.herokuapp.com/api/sitter');
  }

  deleteSitter(id: string): Observable<object> {
    return this.http.delete<object>(`https://safe-sea-95431.herokuapp.com/api/sitter/${id}`);
  }

  updateSitter(id: string, sitter: object): Observable<object> {
    return this.http.put<object>(`https://safe-sea-95431.herokuapp.com/api/sitter/${id}`, sitter);
  }

  addComment(comment: object): Observable<object> {
    return this.http.post<object>('https://safe-sea-95431.herokuapp.com/api/comment', comment);
  }

  getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('https://safe-sea-95431.herokuapp.com/api/comment');
  }

  updateSitterRate(id: string, rate: number): Observable<any> {
    return this.http.put<any>(`https://safe-sea-95431.herokuapp.com/api/sitter-rate/${id}`, {"rate": rate});
  }

}