export class Piste {
  public _id: number ;
  public _titre: string ;
  public _duree: number ;

  constructor(id: number, titre: string, duree: number) {
    this._id = id;
    this._titre = titre;
    this._duree = duree;
  }
}
