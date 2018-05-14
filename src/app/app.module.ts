import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CdComponent } from './cd/cd.component';
import { PisteComponent } from './piste/piste.component';
import { FormsModule } from '@angular/forms';
import { MusiqueService } from './services/musique.service';
import { AppareilComponent } from './appareil/appareil.component';
import { ArtisteComponent } from './artiste/artiste.component';
import { TracksdatetimeDirective } from './tracksdatetime.directive';
import { YeardatetimeDirective } from './yeardatetime.directive';


const appRoutes = [
  {path: 'cd', component: CdComponent },
  {path: 'collection', component: AppareilComponent },
  {path: 'artiste', component: ArtisteComponent },
  {path: '', component: CdComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    CdComponent,
    PisteComponent,
    AppareilComponent,
    ArtisteComponent,
    TracksdatetimeDirective,
    YeardatetimeDirective
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    MusiqueService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
