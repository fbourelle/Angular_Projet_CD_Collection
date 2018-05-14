import { Component, Input, OnInit } from '@angular/core';
import { MusiqueService } from '../services/musique.service';
import {Musique} from '../Models/musique';
import { Cd } from '../Models/cd';
import { Artiste } from '../Models/artiste';
import {Subscription} from 'rxjs/Subscription';
import { TracksdatetimeDirective } from '../tracksdatetime.directive';
import {MessageAlert} from '../Models/messageAlert';

@Component({
  selector: 'app-cd',
  templateUrl: './cd.component.html',
  styleUrls: ['./cd.component.scss']
})
export class CdComponent implements OnInit {
  duree: number;
  dureeseconde: number;
  @Input() cd: Cd;
  musique: Musique;
  musiqueSubscription: Subscription;
  messageAlert: MessageAlert;

  constructor(private musiqueService: MusiqueService) {
  }
  ngOnInit() {
    this.musiqueService.onMessage('toto');
    this.messageAlert = this.musiqueService.message;
    this.musiqueSubscription = this.musiqueService.musiqueSubject.subscribe(
      (musique: Musique) => {
        this.musique = musique;
      }
    );
    this.musiqueService.emitMusiqueSubject();
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
