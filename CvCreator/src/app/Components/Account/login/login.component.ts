import { LoginCreditentials } from './../../../Models/LoginCreditentials';
import { FormApiManager } from './../../../Utilities/FormApiManager';
import { FormManager } from './../../../Utilities/FormManager';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends FormManager<LoginCreditentials>
  implements OnInit
{
  visible = false;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    super(new FormApiManager(http, 'https://localhost:7184/auth'));
    this._form = builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    // this._form.setValue({ email: '@asd', password: 'asd' });
  }

  toggle() {
    this.visible = !this.visible;
  }

  login() {
    const creditentials = {
      email: 'test@test.pl',
      password: '',
    };
    this.http
      .post('https://localhost:7184/auth', creditentials, {
        responseType: 'text',
      })
      .subscribe(
        (data) => {
          console.log(data);
          localStorage.setItem('jwt', data);
        },
        (err: HttpErrorResponse) => {
          console.log(err);
        }
      );
  }

  get email(): FormControl {
    return this._form.get('email') as FormControl;
  }
  set email(val) {
    this.email?.setValue(val);
  }

  get password(): FormControl {
    return this._form.get('password') as FormControl;
  }
  set password(val) {
    this.password?.setValue(val);
  }
}
