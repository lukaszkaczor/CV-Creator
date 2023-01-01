import { CurriculumVitaeService } from './Services/curriculum-vitae.service';
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
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { AddressComponent } from './Components/Creator/address/address.component';
import { ContactDataComponent } from './Components/Creator/contact-data/contact-data.component';
import { CvContentComponent } from './Components/cv-content/cv-content.component';
import { ContentDirective } from './Components/cv-content/content.directive';
import { CvDataManager } from './Utilities/CvCreator/CvDataManager';
import { TemplateService } from './Utilities/CvCreator/TemplateService';
import { TemplateEditor } from './Utilities/CvCreator/TemplateEditor';
import { CvBuilder } from './Utilities/CvCreator/CvBuilder';

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
    NotFoundComponent,
    AddressComponent,
    ContactDataComponent,
    CvContentComponent,
    ContentDirective,
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
    CvDataManager,
    TemplateService,
    TemplateEditor,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
