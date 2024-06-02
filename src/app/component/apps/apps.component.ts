import {Component, OnInit} from '@angular/core';
import {AppRouter} from "../../service/AppRouter";
import {Header} from "../../model/Header";
import {HubService} from "../../service/hub.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {map} from "rxjs";
import {Config} from "../../service/Config";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  standalone: true,
  imports: [
    NgForOf,
    NgOptimizedImage,
    NgIf
  ],
  styleUrls: ['./apps.component.scss']
})
export class AppsComponent implements OnInit {

  public headers!: Header[];

  constructor(
    protected config: Config,
    protected authService: AuthService,
    private router: AppRouter,
    private hubService: HubService,
  ) {
  }

  ngOnInit() {
    this.hubService.getHeader()
      .pipe(
        map(headers => {
          headers.forEach(header => {
            if (header.iconUrl == null) {
              header.iconUrl = "/assets/unknown.svg"
            }
          });
          return headers;
        })
      )
      .subscribe((headers) => {
        this.headers = headers;
      });
  }

  goToSetPassword() {
    this.router.goToPassword();
  }

  public logout() {
    this.authService.logout();
    this.router.goToLogin();
  }

}
