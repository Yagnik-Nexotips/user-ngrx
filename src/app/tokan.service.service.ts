import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { userData } from './core-test/user-model/user.model';
import { response } from 'express';
// import { user } from './core-test/user-model/user.model';
// import { User } from './core-test/reducer-test/counter.reducer';

@Injectable({
  providedIn: 'root',
})
export class TokanServiceService {
  private apiUrl = 'http://dailyapi.nexotips.com/admin/user';
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3LCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM0NDMxNjkzLCJleHAiOjE3MzUwMzE2OTN9.Vz0azoOYlt0x8EIX5tqnpW0S9qopJPrIDhoQdlS2LgM';

  constructor(private http: HttpClient) {}

  getData(payload: userData): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .post<any>(`${this.apiUrl}/list`, payload, { headers })
      .pipe(
        map((response) => {
          return response?.data?.data || [];
        }),
        catchError((error) => {
          return of([]);
        })
      );
  }
  addUser(User: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.post<any>(`${this.apiUrl}/create`, User, { headers }).pipe(
      map((response) => {
        return response?.data?.data || [];
      }),
      catchError((error) => {
        return of([]);
      })
    );
  }

  upDateUser(userId: string, userData: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put(`${this.apiUrl}/update/${userId}`, userData, { headers })
      .pipe(
        map((response) => {
          return;
        })
      );
  }
}
