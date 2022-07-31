import { CurriculumVitaeService } from './../../../Services/curriculum-vitae.service';
import { CurriculumVitae } from 'src/app/Models/CurriculumVitae';
import { AuthService } from './../../../Services/auth.service';
import { LoginCreditentials } from './../../../Models/LoginCreditentials';
import { FormManager } from './../../../Utilities/FormManager';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent
  extends FormManager<CurriculumVitae>
  implements OnInit
{
  visible = false;
  constructor(
    private auth: AuthService,
    private builder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private ss: CurriculumVitaeService
  ) {
    super(ss, builder);
    this.form = builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  toggle() {
    this.visible = !this.visible;
  }

  async login(): Promise<void> {
    const creditentials: LoginCreditentials = {
      email: this.email.value,
      password: this.password.value,
    };

    if (!this.form.valid) return;

    this.auth.authorize(creditentials).subscribe({
      next: (response) => {
        console.log(response);
        localStorage.setItem('jwt', JSON.stringify(response));
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.log(error);
        this.visible = true;
      },
    });
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  set email(val) {
    this.email?.setValue(val);
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }
  set password(val) {
    this.password?.setValue(val);
  }
}
