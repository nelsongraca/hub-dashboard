import { Routes } from '@angular/router';
import {AppsComponent} from "./component/apps/apps.component";
import {LoginComponent} from "./component/login/login.component";
import {PasswordComponent} from "./component/password/password.component";

export const routes: Routes = [
  {path: 'apps', component: AppsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'password', component: PasswordComponent},
];
