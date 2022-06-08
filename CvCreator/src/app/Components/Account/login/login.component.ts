import { ErrorCode } from './../../../Models/ErrorCode';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;

  visible = false;
  constructor(
    private builder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  toggle() {
    this.visible = !this.visible;
  }

  submit() {
    console.log(this.form);
    this.login();
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

  get email() {
    return this.form.get('email');
  }
  set email(val) {
    this.email?.setValue(val);
  }

  get password() {
    return this.form.get('password');
  }
  set password(val) {
    this.password?.setValue(val);
  }
}
