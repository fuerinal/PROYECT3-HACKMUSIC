import { Routes } from '@angular/router';

import {  AppComponent } from './app.component';
import {  LoginFormComponent } from './login-form/login-form.component';
import {  HomeComponent } from './home/home.component';
import {  EstablishmentsComponent } from './establishments/establishments.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: EstablishmentsComponent },
  { path: '**',  component: EstablishmentsComponent }
];
