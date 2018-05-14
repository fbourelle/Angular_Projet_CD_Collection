import { Piste } from './piste';
import { Artiste } from './artiste';

export class Cd {
  public _id: number ;
  public _album: string ;
  public _artiste: Artiste ;
  public _duree_totale: number ;
  public _image: string ;
  public _tab_pistes: Piste[];

  constructor(id: number, album: string, artiste: Artiste, duree_totale: number, image: string, tab_pistes) {
    this._id = id;
    this._album = album;
    this._artiste = artiste;
    this._duree_totale = duree_totale;
    this._image = image;
    this._tab_pistes = tab_pistes;
  }
}
