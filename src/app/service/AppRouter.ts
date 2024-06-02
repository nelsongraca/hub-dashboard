import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppRouter {

  constructor(private router: Router) {
  }

  gotoApps() {
    this.router.navigate(['apps']);
  }

  goToPassword() {
    this.router.navigate(['password']);
  }

  goToLogin() {
    this.router.navigate(["login"]);
  }
}
