import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {firstValueFrom, Observable} from "rxjs";
import {Header} from "../model/Header";
import {Config} from "./Config";
import {tap} from "rxjs/internal/operators/tap";
import {Constants} from "../../constants";
import {User} from "../model/User";
import {UserDetailsResponse} from "../model/UserDetailsResponse";
import {AuthService} from "./auth.service";


@Injectable({
  providedIn: 'root'
})
export class HubService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private config: Config
  ) {

  }

  public getHeader(): Observable<Header[]> {
    const compareFn = (a: Header, b: Header) => {
      if (a.name < b.name)
        return -1;
      if (a.name > b.name)
        return 1;
      return 0;
    };

    return this.http.get<Header[]>(this.config.hubUrl + Constants.HUB_API_PATH + "services/header", this.getOptions())
      .pipe(
        tap(results => {
          results.sort(compareFn)
        })
      );
  }

  private getOptions() {
    return {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.authService.getToken()
      })
    };
  }

  public getCurrentUsername(): Observable<User> {
    return this.http.get<User>(this.config.hubUrl + Constants.HUB_API_PATH + "users/me", this.getOptions());
  }

  public async saveNewPassword(password: string) {
    let currentUser = await firstValueFrom(this.getCurrentUsername());
    let userId = currentUser.id;
    let userLogin = currentUser.login;
    let userDetailsResponse = await firstValueFrom(this.getHubCredentials(userLogin));

    if (userDetailsResponse.userdetails.length > 0) {
      let detailsId = userDetailsResponse.userdetails[0].id;
      await firstValueFrom(this.http.delete(this.config.hubUrl + Constants.HUB_API_PATH + "userdetails/" + detailsId, this.getOptions()));
    }
    return this.createHubCredentials(userId, userLogin, password)
  }

  private getHubCredentials(userLogin: string) {
    return this.http.get<UserDetailsResponse>(this.config.hubUrl + Constants.HUB_API_PATH + "userdetails?query=authMethod:Hub and user:" + userLogin, this.getOptions())
  }

  private async createHubCredentials(userId: string, userLogin: string, password: string) {
    let body = {
      "type": "LoginuserdetailsJSON",
      "authModule": {
        "id": this.config.coreModuleId
      },
      "user": {
        "type": "user",
        "id": userId,
        "login": userLogin
      },
      "login": userLogin,
      "password": {
        "type": "PlainpasswordJSON",
        "value": password
      }
    };
    return firstValueFrom(this.http.post(this.config.hubUrl + Constants.HUB_API_PATH + "userdetails", body, this.getOptions()));
  }
}
