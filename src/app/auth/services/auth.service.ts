import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.development';
import {Router} from '@angular/router';
import {LoginDto} from '../models/login-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //injections
  private http = inject(HttpClient);
  private route = inject(Router);

  //variables
  private apiUrl = environment.apiUrl;
  constructor() { }

  login(model: LoginDto){
    return this.http.post<any>(`${environment.apiUrl}auth/login`, model);
  }

  register(model: any){
    return this.http.post(`${environment.apiUrl}auth/register`, model);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');

  }

}
