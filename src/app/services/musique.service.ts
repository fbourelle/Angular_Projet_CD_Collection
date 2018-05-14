import { Musique } from '../Models/musique';
import { Piste } from '../Models/piste';
import { Artiste } from '../Models/artiste';
import { Cd } from '../Models/cd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {MessageAlert} from '../Models/messageAlert';

@Injectable()
export class MusiqueService {
  musiqueSubject = new Subject<Musique>();
  piste1 = new Piste(1, 'Taeuschungs-Blume', 316);
  piste2 = new Piste(2, 'Echomaus', 415);
  artiste1 = new Artiste( 'Alain Bashung', 1947, false);
  artiste2 = new Artiste( 'Dominik Eulberg', 1978, true);
  piste3 = new Piste(1, 'Helvete Underground', 216);
  piste4 = new Piste(2, 'Camping Jazz', 223);
  piste5 = new Piste(1, 'Ca Cache Quekchose', 167);
  piste6 = new Piste(2, 'J\'Sors Avec Ma Frangine', 168);
  pistesalbum1 = [this.piste1, this.piste2];
  pistesalbum2 = [this.piste3, this.piste4];
  album1 = new Cd(1, 'Diorama', this.artiste2, 731, 'https://images-eu.ssl-images-amazon.com/images/I/61Q9LVVWRsL._AC_US218_.jpg', this.pistesalbum1 );
  album3 = new Cd(3, 'Pizza', this.artiste1, (167 + 168), 'https://agafarots.files.wordpress.com/2017/05/bashungpizza.jpg', [this.piste5, this.piste6] );
  image2 = 'http://p1.storage.canalblog.com/13/83/636073/46691737.gif';
  album2 = new Cd(2, 'Passe le Rio Grande', this.artiste1, (216 + 223), this.image2, this.pistesalbum2 );
  private musique = new Musique([this.album1, this.album2, this.album3], [this.artiste1, this.artiste2]);
  message = new MessageAlert('toto');
  constructor(private  httpClient: HttpClient) {}

  emitMusiqueSubject() {
    this.musiqueSubject.next(this.musique);
  }

  onMessage(message) {
    this.message._message = message;
    console.log(this.message._message);
  }

  envoyer() {
    this.httpClient.put('https://gestion-equipe-eb561.firebaseio.com/tableau.json', this.musique)
                    .subscribe(
                      () => {
                        console.log('ok');
                        this.onMessage('succes_collection');
                      }, (error) => {
                        console.log('error');
                      }
                    );
  }

  lecture() {
    this.httpClient.get<Musique>('https://gestion-equipe-eb561.firebaseio.com/tableau.json')
                    .subscribe(
                        (response) => {
                          this.musique = response;
                          this.emitMusiqueSubject();
                          console.log(response);
                        }, (error) => {
                          console.log('error');
                        }
                    );
    }

  ajouterArtiste(a: Artiste) {
    this.musique._tab_artistes.push(a);
    this.onMessage('succes_artiste');
    }

  ajouterAlbum(cd: Cd) {
    this.musique._tab_cds.push(cd);
    this.onMessage('succes_cd');
  }

  ajouterTitre(idcd: number, p: Piste) {
    this.musique._tab_cds[idcd]._tab_pistes.push(p);
  }
}
