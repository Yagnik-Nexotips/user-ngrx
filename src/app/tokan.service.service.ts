import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, pipe } from 'rxjs';
import { user } from './core-test/user-model/user.model';
// import { User } from './core-test/reducer-test/counter.reducer';

@Injectable({
  providedIn: 'root',
})
export class TokanServiceService {
  private apiUrl = 'http://dailyapi.nexotips.com/admin/user';
  private token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3LCJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzM0MzQyNzExLCJleHAiOjE3MzQ5NDI3MTF9.8mMad7ZOFhFMHacI2iO0d69lg8ZS5hFI5RLWbuB5ND4';

  constructor(private http: HttpClient) {}

  getData(payload: user): Observable<any[]> {
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
}
