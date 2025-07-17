import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  register(credentials: { email: string; password: string }) {
    // Implement login logic here
    const url = `${environment.apiUrl}/api/register`;
    return this.http.post(url, credentials);
  }
}
