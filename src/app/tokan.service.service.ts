import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { User } from './core-test/reducer-test/counter.reducer';

@Injectable({
  providedIn: 'root',
})
export class TokanServiceService {
  private apiUrl = 'http://dailyapi.nexotips.com/admin/user/list';
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3LCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzMzMzkyODk1LCJleHAiOjE3MzM5OTI4OTV9.vm6LVHVgGI950AqiSEqktJ89Ww7w17k160A0TFkAEfE';

  constructor(private http: HttpClient) {}

  getData(payload: User): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post<any>(this.apiUrl, payload, { headers }).pipe(
      map((response) => {
        return response?.data?.data || [];
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }
  addUser(User: User): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post<any>(this.apiUrl, User, { headers }).pipe(
      map((response) => {
        return response?.data?.data || [];
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }
}
