import {Component, inject, OnInit} from '@angular/core';
import { AuthService } from "../../services/auth.service";
import {LoginDto} from '../../models/login-dto';
import { Router, RouterModule } from "@angular/router";
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  //injections
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  protected fb = inject(FormBuilder)
  //variables
  loginDto!: LoginDto;
  loginForm!: FormGroup;

  initializingLoginForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    })
  }

  constructor() {
     if(this.authService.token() !== null){
       this.router.navigate(['/address-book']);
     }
  }

  ngOnInit() {
    this.initializingLoginForm();
  }

  onSubmit(model: LoginDto){
    this.authService.login(model).subscribe({
      next:(res)=>{
        if(res.message === null){
          this.toastr.success("Login Successfully");
          this.router.navigate(['/address-book']);
        }else {
          this.toastr.error(res.message);
        }
      },
      error:(error)=>{
        this.toastr.error(error.message);
      }
    })
  }

}
