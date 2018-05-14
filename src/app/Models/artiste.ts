export class Artiste {
  public _nom: string ;
  public _age: number ;
  public _alive: boolean;

  constructor(nom: string, age: number, alive: boolean) {
    this._nom = nom;
    this._age = age;
    this._alive = alive;
  }
}
