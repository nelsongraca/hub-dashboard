import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AppRouter} from "./service/AppRouter";
import {AuthService} from "./service/auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: AppRouter
  ) {
    this.authService.setup(() => this.redirectToProperPage()).then(success => {
        this.redirectToProperPage();
      }
    );
  }

  private redirectToProperPage() {
    if (this.authService.isAuthenticated()) {
      this.router.gotoApps();
    } else {
      this.router.goToLogin();
    }
  }
}
