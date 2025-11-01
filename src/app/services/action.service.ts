import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class ActionService {
  private baseUrl = `${environment.apiUrl}/actions`;

  constructor(private http: HttpClient) { }

  createAction(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }
}
