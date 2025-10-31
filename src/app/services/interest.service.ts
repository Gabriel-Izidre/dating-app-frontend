import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interest } from '../interfaces/interest.interface';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class InterestService {
  private baseUrl = `${environment.apiUrl}/interests`;

  constructor(private http: HttpClient) { }

  getInterests(): Observable<Interest[]> {
    return this.http.get<Interest[]>(this.baseUrl);
  }
}
