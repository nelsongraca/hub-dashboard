import {HasId} from "./HasId";

export class Header extends HasId {
  public name!: string;
  public homeUrl!: string;
  public iconUrl!: string;
}
