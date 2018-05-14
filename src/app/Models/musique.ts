import { Cd } from './cd';
import { Artiste } from './artiste';

export class Musique {
  public _tab_cds: Cd[];
  public _tab_artistes: Artiste[];

  constructor(tab_cd, tab_artistes) {
    this._tab_cds = tab_cd;
    this._tab_artistes = tab_artistes;
  }
}
