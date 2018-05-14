import {Component, Input, OnInit} from '@angular/core';
import { MusiqueService } from '../services/musique.service';
import {Subscription} from 'rxjs/Subscription';
import {Musique} from '../Models/musique';
import { NgForm } from '@angular/forms';
import { Artiste } from '../Models/artiste';
import { Cd } from '../Models/cd';
import {Piste} from '../Models/piste';
import {ɵplatformCoreDynamicTesting} from '@angular/platform-browser-dynamic/testing';
import {MessageAlert} from '../Models/messageAlert';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  musique: Musique;
  musiqueSubscription: Subscription;
  a1: Artiste;
  a2: Artiste;
  b1: Cd;
  nb_id: number;
  status: boolean;
  duree: number;
  dureeseconde: number;
  @Input() cd: Cd;
  albumSelect: number;
  id_album: number;
  bool_id: boolean;
  p1: Piste;
  id_piste: number;
  years: [number];
  img: string;
  messageAlert: MessageAlert;
  messageAlert2: MessageAlert;
  idPiste: number;

  constructor(private musiqueService: MusiqueService) {
  }
  ngOnInit() {
    this.musiqueService.onMessage('toto');
    this.messageAlert = this.musiqueService.message;
    this.messageAlert2 = this.musiqueService.message;
    this.musiqueSubscription = this.musiqueService.musiqueSubject.subscribe(
      (musique: Musique) => {
        this.musique = musique;
      }
    );
    this.musiqueService.emitMusiqueSubject();
    if (!this.years) {
      this.onYears();
    }
  }

  onYears() {
    const start = new Date();
    let year = start.getFullYear() - 5;
    this.years = [year];
    year--;
    while (year > 1899) {
      this.years.push(year);
      year--;
    }
  }

  onAjouterArtiste(form: NgForm) {
    if (form.value['status'] && form.value['nom'] && form.value['age']) {
      if (form.value['status'] === 'true') {
        this.status = true;
      } else {
        this.status = false;
      }
      this.a1 = new Artiste(form.value['nom'], parseInt(form.value['age'], 10), this.status);
      this.musiqueService.ajouterArtiste(this.a1);
    } else {
      this.musiqueService.onMessage('erreur_artiste');
    }
  }

  onAjouterAlbum(form: NgForm) {
    if (form.value['artiste'] && form.value['nomalbum']) {
      this.nb_id = this.musique._tab_cds.length - 1;
      const id = this.musique._tab_cds[this.nb_id]._id + 1;
      for (let i = 0 ; i < this.musique._tab_artistes.length ; i++) {
        if (this.musique._tab_artistes[i]._nom === form.value['artiste']) {
          this.a2 = this.musique._tab_artistes[i];
        }
      }
      if (!form.value['image']) {
        this.img = './assets/img/img_cd.png';
      } else {
        this.img = form.value['image'];
      }
      this.b1 = new Cd(id, form.value['nomalbum'],  this.a2, 0, this.img, []);
      this.musiqueService.ajouterAlbum(this.b1);
    } else {
      this.musiqueService.onMessage('erreur_cd');
    }
  }

  onChoisirAlbum() {
    console.log('albumSelect = ' + this.albumSelect);
    for (let i = 0; i < this.musique._tab_cds.length; i++) {
      if (this.albumSelect == this.musique._tab_cds[i]._id) {
        this.id_album = i;
        this.bool_id = false;
      }
    }
  }

  onAjouterTitre(form: NgForm) {
    if (!(form.value['duree'] && form.value['titre'])) {
      this.musiqueService.onMessage('erreur_titre');
    } else {
      const dureePisteSplit = form.value['duree'].split(':');
      const minutesPiste = (parseInt(dureePisteSplit[0], 10) * 60);
      const secondesPiste = parseInt(dureePisteSplit[1], 10);
      const dureePiste = minutesPiste + secondesPiste;
      if (this.musique._tab_cds[this.id_album]._tab_pistes) {
        this.idPiste = this.musique._tab_cds[this.id_album]._tab_pistes.length - 1;
        if (this.idPiste < 0) {
          this.id_piste = 1;
        } else {
          this.id_piste = this.musique._tab_cds[this.id_album]._tab_pistes[this.idPiste]._id + 1;
        }
      } else {
        this.musique._tab_cds[this.id_album]._tab_pistes = [];
        this.id_piste = 1;
      }
      console.log(dureePiste);
      this.p1 = new Piste(this.id_piste, form.value['titre'], dureePiste);
      this.musiqueService.ajouterTitre(this.id_album, this.p1);
      this.musique._tab_cds[this.id_album]._duree_totale = (this.musique._tab_cds[this.id_album]._duree_totale + dureePiste);
      this.musiqueService.onMessage('succes_titre');
    }
  }

  onAfficheMinutes(d: number) {
    this.duree = Math.floor(d / 60);
    return this.duree;
  }
  onAfficheSecondes(dsec: number) {
    this.dureeseconde = (dsec % 60) ;
    return this.dureeseconde;
  }
}
