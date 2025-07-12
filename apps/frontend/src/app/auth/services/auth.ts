import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private http = inject(HttpClient);

  login(credentials: { email: string; password: string }) {
    // Implement login logic here
    const url = `${environment.apiUrl}/api/login`;
    return this.http.post(url, credentials).subscribe({
      next: (response) => {
        console.log('Login successful', response);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }
}
