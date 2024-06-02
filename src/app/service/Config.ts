import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class Config {
  public hubClientId!: string;
  public coreModuleId: string | null = null;
  public hubUrl!: string;
  public canChangePassword: boolean = false;

  constructor(private http: HttpClient) {
  }

  public load(): Observable<boolean> {
    return this.http.get<Config>('./config.json').pipe(
      map(config => {
        this.hubClientId = config.hubClientId;
        this.hubUrl = config.hubUrl;
        this.coreModuleId = config.coreModuleId;
        return true;
      })
    )
  }
}
