import {AuthConfig, OAuthService} from "angular-oauth2-oidc";
import {Injectable} from "@angular/core";
import {JwksValidationHandler} from "angular-oauth2-oidc-jwks";
import {timer} from "rxjs";
import {Config} from "./Config";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private oauthService: OAuthService,
    private config: Config
  ) {
  }

  logout() {
    this.oauthService.revokeTokenAndLogout();
  }

  isAuthenticated() {
    return this.oauthService.hasValidAccessToken();
  }

  getToken() {
    return this.oauthService.getAccessToken()
  }

  login() {
    this.oauthService.initImplicitFlow();
  }


  setup(loggedInAction: () => void) {
    const authConfig: AuthConfig = {
      issuer: this.config.hubUrl,
      redirectUri: window.location.origin,
      clientId: this.config.hubClientId,
      scope: 'openid profile email'
    };
    this.oauthService.configure(authConfig);
    this.oauthService.tokenValidationHandler = new JwksValidationHandler();
    this.oauthService.setStorage(localStorage);
    return this.oauthService.loadDiscoveryDocumentAndTryLogin({
      onTokenReceived: context => {
        timer(100).subscribe(value => {
          loggedInAction()
        })
      }
    });
  }
}
