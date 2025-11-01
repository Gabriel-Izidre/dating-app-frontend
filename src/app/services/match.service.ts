import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class MatchService {
  private baseUrl = `${environment.apiUrl}/matches/user`;

  constructor(private http: HttpClient) { }

  getMatches(userId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }
}
