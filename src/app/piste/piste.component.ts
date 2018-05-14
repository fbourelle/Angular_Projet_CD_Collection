import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Cd} from '../Models/cd';
import {Musique} from '../Models/musique';
import {MusiqueService} from '../services/musique.service';
import {CdComponent} from '../cd/cd.component';
import {Piste} from '../Models/piste';

@Component({
  selector: 'app-piste',
  templateUrl: './piste.component.html',
  styleUrls: ['./piste.component.scss']
})
export class PisteComponent implements OnInit {
  @Input() piste: Piste;
  duree: number;
  dureeseconde: number;
  @Input() cd: Cd;
  musique: Musique;
  musiqueSubscription: Subscription;

  constructor(private musiqueService: MusiqueService) {
  }
  ngOnInit() {
    this.musiqueSubscription = this.musiqueService.musiqueSubject.subscribe(
      (musique: Musique) => {
        this.musique = musique;
      }
    );
    this.musiqueService.emitMusiqueSubject();
  }

  onAfficheMinutes(d: number) {
    this.duree = Math.round(d / 60);
    return this.duree;
  }
  onAfficheSecondes(dsec: number) {
    this.dureeseconde = (dsec % 60) ;
    return this.dureeseconde;
  }

}
