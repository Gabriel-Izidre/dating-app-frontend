import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private baseUrl = '/actions';

  constructor(private http: HttpClient) { }

  createAction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}
