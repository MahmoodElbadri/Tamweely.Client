import {AbstractControl, ValidationErrors} from '@angular/forms';

export function passwordMatchValidator(passwordField: string, confirmPasswordField: string){
  return (control: AbstractControl): ValidationErrors | null=>{
    const passwordControl = control.get(passwordField);
    const confirmPasswordControl = control.get(confirmPasswordField);
    if(passwordControl?.value !== confirmPasswordControl?.value){
      confirmPasswordControl?.setErrors({passwordMatch: true});
    }
    return null;
  }
}
