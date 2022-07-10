import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './Components/Account/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TestComponent } from './Components/test/test.component';
import { AuthInterceptor } from 'src/Interceptors/auth.interceptor';
import { BasicInfoComponent } from './Components/Creator/basic-info/basic-info.component';
import { PersonalDataComponent } from './Components/Creator/personal-data/personal-data.component';
import { DocumentListComponent } from './Components/document-list/document-list.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    TestComponent,
    BasicInfoComponent,
    PersonalDataComponent,
    DocumentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:4200/'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
