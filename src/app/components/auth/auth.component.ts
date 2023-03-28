import { Component } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

export function mustMatch(formControlName1: string, formControlName2:string): ValidatorFn {
  return function (control: AbstractControl): ValidationErrors | null {
    const formGroup = <FormGroup>control;
    const control1 = formGroup.controls[formControlName1];
    const control2 = formGroup.controls[formControlName2];
    if( control1.value !== control2.value )
      return {
        'must-match': {
          controls: [
            formControlName1,
            formControlName2                    ]
        }
      }
    return null;
  }
}
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  form: FormGroup;
  registerForm: FormGroup;
  register: boolean = false;

  constructor(
    private readonly _authService: AuthService,
    private router: Router
  ){
    this.registerForm = new FormGroup({
      'email': new FormControl('', [Validators.email]),
      'password': new FormControl('',[Validators.pattern("^^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{4,}$"),Validators.min(4)]),
      'confirm': new FormControl(''),
      'name': new FormControl(''),
      'firstName': new FormControl(''),
      'phoneNumber': new FormControl('',[Validators.pattern("^0\\d{8,9}$")]),
      'adress': new FormControl('')
    }, {
      validators: [mustMatch('password', 'confirm')]
    });
    this.form = new FormGroup({
      'login': new FormControl('', [Validators.minLength(4)]),
      'password': new FormControl('')
    });
  }
  onSubmit(){
    if( this.form.valid ){
        this._authService.login(this.form.value).subscribe({
          next: (response : any) => {
            localStorage.setItem("token", response.token);
            localStorage.setItem("login", response.login);
            let list: string[] = response.roles;
            for (let i = 0 ; i< list.length; i++){
              let role: string = ''+list.at(i);
              localStorage.setItem("role"+ i, role);
            }
            this.router.navigate(['home']);
          }
        })
    }
  }
  onRegister(){
    if( this.registerForm.valid ){
      this._authService.register(this.registerForm.value).subscribe();
      this.register = false;
      this.router.navigate(['auth'])
    }
  }
}
