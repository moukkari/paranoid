import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LastFmService } from './lastfm.service';
import { SpotifyService } from './spotify.service';

import { AlbumtableComponent } from './albumtable/albumtable.component';
import { SetlistsComponent } from './setlists/setlists.component';
import { LandingComponent } from './landing/landing.component';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FooterComponent } from './footer/footer.component';

import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ChatComponent } from './chat/chat.component';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    AlbumtableComponent,
    SetlistsComponent,
    LandingComponent,
    FooterComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    MatPaginatorModule,
    MatTableModule,
    BrowserAnimationsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatProgressBarModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [LastFmService, SpotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
