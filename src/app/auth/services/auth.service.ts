import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Router} from '@angular/router';
import {LoginDto} from '../models/login-dto';
import {AuthResponseDto} from '../models/auth-response-dto';
import {RegisterDto} from '../models/register-dto';
import {of, switchMap, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //injections
  private http = inject(HttpClient);
  private route = inject(Router);
  token = signal<string | null>(localStorage.getItem('token') || null);

  //variables
  private apiUrl = environment.apiUrl;
  constructor() { }

  login(model: LoginDto){
    return this.http.post<AuthResponseDto>(`${this.apiUrl}auth/login`, model).pipe(
      tap((response)=>{
        const token = response.token;
        const username = response.username;
        if(token){
          localStorage.setItem('username', username);
          localStorage.setItem('token', token);
          this.token.set(token);
        }
      })
    );
  }

  register(model: RegisterDto){
    return this.http.post<AuthResponseDto>(`${this.apiUrl}auth/register`, model).pipe(
      tap((response)=>{
        const token = response.token;
        const username = response.username;
        if(token){
          localStorage.setItem('username', username);
          localStorage.setItem('token', token);
          this.token.set(token);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  }

}
