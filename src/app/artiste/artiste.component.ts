import { Component, Input, OnInit } from '@angular/core';
import { MusiqueService } from '../services/musique.service';
import {Musique} from '../Models/musique';
import { Cd } from '../Models/cd';
import {Artiste} from '../Models/artiste';
import { Subject } from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import {MessageAlert} from '../Models/messageAlert';

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss']
})
export class ArtisteComponent implements OnInit {
  @Input() artiste: Artiste;
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
}
