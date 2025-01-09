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
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3LCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM2MzI4OTE4LCJleHAiOjE3MzY5Mjg5MTh9.i_y60B87s2ph3AVK_L7Okn7nLnkf3PsRBKbFdxoXLck';

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

  // Add method to get user details
  getUserDetails(userId: string): Observable<userData> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http.get<any>(`${this.apiUrl}/${userId}`, { headers }).pipe(
      map((response) => {
        return response?.data || {}; // Return the user data or empty object if not found
      }),
      catchError((error) => {
        return of({} as userData); // Return an empty object in case of error
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

  updateUser(User: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );

    return this.http
      .put<any>(`${this.apiUrl}/update/${User.id}`, User, { headers })
      .pipe(
        map((response) => {
          return response?.data?.data;
        }),
        catchError((error) => {
          return of([]);
        })
      );
  }
}
