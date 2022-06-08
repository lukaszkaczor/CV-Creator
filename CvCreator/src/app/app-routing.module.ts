import { AuthGuard } from './Guards/auth.guard';
import { TestComponent } from './Components/test/test.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { LoginComponent } from './Components/Account/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
