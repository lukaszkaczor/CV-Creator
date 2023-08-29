import { CvContentComponent } from './Components/cv-content/cv-content.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { DocumentListComponent } from './Components/document-list/document-list.component';
import { BasicInfoComponent } from './Components/Creator/basic-info/basic-info.component';

import { AuthGuard } from './Guards/auth.guard';
import { TestComponent } from './Components/test/test.component';
import { RegisterComponent } from './Components/Account/register/register.component';
import { HomeComponent } from './Components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/Account/login/login.component';
import { TemplatesListComponent } from './Components/Admin/templates-list/templates-list.component';
import { AdminPanelComponent } from './Components/Admin/admin-panel/admin-panel.component';
import { TemplateListComponent } from './Components/Admin/template-list/template-list.component';
import { AdminGuard } from './Guards/admin.guard';
import { ExperienceComponent } from './Components/Creator/experience/experience.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '404', component: NotFoundComponent },
  { path: 'test', component: TestComponent },
  { path: 'content', component: CvContentComponent },
  // { path: 'test', component: TestComponent, canActivate: [AuthGuard] },
  { path: 'basic/:id', component: BasicInfoComponent },
  { path: 'experience/:id', component: ExperienceComponent },
  {
    path: 'documents',
    component: DocumentListComponent,
    canActivate: [AuthGuard],
  },
  { path: "templates", component: TemplatesListComponent},
  { path: "admin", component: AdminPanelComponent, canActivate: [AuthGuard, AdminGuard], children: [
    {path: "templates", component: TemplateListComponent},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
