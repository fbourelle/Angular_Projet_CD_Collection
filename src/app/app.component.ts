import { Component, Input, OnInit } from '@angular/core';
import { MusiqueService } from './services/musique.service';
import {Musique} from './Models/musique';
import {Cd} from './Models/cd';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {MessageAlert} from './Models/messageAlert';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() cd: Cd;
  musique: Musique;
  musiqueSubscription: Subscription;
  messageAlert: MessageAlert;

  constructor(private musiqueService: MusiqueService) {
  }
  ngOnInit() {
    this.messageAlert = this.musiqueService.message;

    this.musiqueSubscription = this.musiqueService.musiqueSubject.subscribe(
      (musique: Musique) => {
        this.musique = musique;
      }
    );
    this.musiqueService.emitMusiqueSubject();
  }
  onEnvoyer() {
    this.musiqueService.envoyer();
  }
  onLire() {
    this.musiqueService.lecture();
  }

}
