import { Injectable } from '@angular/core';
import { Sitter, Comment, Book } from './sitter.interfaces';
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

  updateSitterRate(id: string, rate: number): Observable<any> {
    return this.http.put<any>(`http://localhost:3000api/sitter-rate/${id}`, {"rate": rate});
  }

  addBook(book: Book): Observable<object> {
    return this.http.post<object>('http://localhost:3000/api/book', book);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/api/book');
  }

  updateBookStatus(id: string, status: object): Observable<object> {
    return this.http.put<object>(`http://localhost:3000/api/book/${id}`, status);
  }

  declineBook(id: string): Observable<object> {
    return this.http.delete<object>(`http://localhost:3000/api/book/${id}`);
  }
  
}