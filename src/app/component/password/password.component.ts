import {Component, OnInit} from '@angular/core';
import {HubService} from "../../service/hub.service";
import {AppRouter} from "../../service/AppRouter";
import {Config} from "../../service/Config";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {
  currentUsername!: string;

  password: string = "";

  message: string = "";

  constructor(
    private config: Config,
    private hubService: HubService,
    private router: AppRouter,
  ) {
  }

  ngOnInit() {
    if (this.config.canChangePassword) {
      this.hubService.getCurrentUsername().subscribe(value => {
        this.currentUsername = value.login;
      });
      this.message = " ";
    }
    else {
      this.router.gotoApps();
    }
  }

  savePassword() {
    this.hubService.saveNewPassword(this.password)
      .then(a => {
        this.password = "";
        this.message = "Success!";
      })
      .catch(a => {
        this.password = "";
        this.message = "Error!";
      });
  }

  toApps() {
    this.router.gotoApps();
  }
}
