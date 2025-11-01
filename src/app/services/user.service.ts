import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/me`);
  }

  updateInterests(interests: string[]): Observable<any> {
    return this.http.put(`${this.baseUrl}/me/interests`, { interests });
  }

  getSuggestedUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/suggested`);
  }

  uploadUserPhotos(id: string, photos: File[]): Observable<any> {
    const formData = new FormData();
    photos.forEach(photo => formData.append('photos', photo));
    return this.http.post(`${this.baseUrl}/${id}/photos`, formData);
  }
}
