import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterDto} from '../../models/register-dto';
import {passwordMatchValidator} from '../../Validators/password-match.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  //injections
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastr = inject(ToastrService);
  protected fb = inject(FormBuilder)

  //variables
  registerDto!: RegisterDto;
  registerForm!: FormGroup;

   constructor() {
     if(this.authService.token !== null){
       this.router.navigate(['/address-book/list']);
     }
   }

  ngOnInit(): void {
    this.initializingRegisterForm();
  }

  initializingRegisterForm(){
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, {
      validators: [passwordMatchValidator('password', 'confirmPassword')]
    })
  }

  onSubmit(registerDto: RegisterDto){
    this.authService.register(registerDto).subscribe({
      next:(response)=>{
        if(response.message === null){
          this.toastr.success("Register Successfully");
           this.router.navigate(['/address-book/list']);
        }else {
          this.toastr.error(response.message);
        }
      },
      error:(error)=>{
        this.toastr.error(error.message);
      }
    })
  }

}
