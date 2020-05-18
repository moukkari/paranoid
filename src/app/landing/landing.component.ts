import { Component, OnInit } from '@angular/core';
import { LastFmService } from '../lastfm.service';
import { EmptyTrack, Track } from '../interfaces/Track-interface';

/**
 * This component works as a landing page for the Paranoid App.
 *
 * The component fetches data from Last.fm API using LastFmService
 * and gets the text inputs from there.
 *
 * The playcount and listener datas are formatted to
 * more user-friendly output before user can see them. A progress
 * spinner can be seen during data fetching.
 *
 * There are also a few embedded components: Chat and YouTube-video.
 */

@Component({
  selector: 'app-landing',
  template: `
  <div class="container-fluid">
    <div *ngIf="isLoading" class="row loader">
      <div class="col">
        <mat-spinner
            class="spinner"
            color="primary"
            mode="indeterminate">
        </mat-spinner>
        <p>Loading...</p>
      </div>
    </div>

    <div *ngIf="!isLoading">
      <div class="row" >
        <div class="col-lg-4 col-sm-12">
          <img alt="Image" [src]="paranoidImg" />
          <app-chat size="100%" chatHeight="200px" [enableTitle]="false"></app-chat>
        </div>
        <div class="col-lg-8 col-sm-12 landingStats">
          <h1>{{paranoid.artist.name}} - {{paranoid.name}}</h1>
          <h2>About</h2>
          <p [innerHTML]="paranoid.wiki.content"></p>
          <hr/>
          <div class="center">
            <h2>Last.fm statistics</h2>
            <h3>Playcount</h3>
            <p class="bignumber">{{ formatNumber(paranoid.playcount) }}</p>
            <h3>Listeners</h3>
            <p class="bignumber">{{ formatNumber(paranoid.listeners) }}</p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col-lg-9 col-sm-12">
          <div class="videoFrame">
            <iframe width="100%" height="400px" src="https://www.youtube.com/embed/hkXHsK4AQPs?controls=0"
              frameborder="0" allowfullscreen crossorigin="anonymous"></iframe>
          </div>
        </div>
        <div class="col-lg-3 col-sm-12">
          <h3>Genres</h3>
          <p *ngFor="let genre of genreArray"><a href={{genre.url}}>{{genre.name}}</a></p>
        </div>
      </div>
    </div>

  </div>
`,
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  title = 'Paranoid app';
  paranoid: Track = EmptyTrack;
  paranoidImg = '';
  genreArray = [];
  isLoading: boolean;

  constructor(private lastfm: LastFmService) {
    this.isLoading = true;
  }

  ngOnInit(): void {
    this.lastfm.fetchData((result: Track) => {
      this.paranoid = result;
      console.log(this.paranoid);
      const imageList = this.paranoid.album.image;
      this.paranoidImg = imageList[3]['#text'];
      this.genreArray = this.paranoid.toptags.tag;
      this.isLoading = false;
    });
  }

  // Adds spaces to big numbers ( 1234567890 --> 12 344 567 890)
  formatNumber(bigNumber: string): string {
    let newString = '';
    for (let x = bigNumber.length - 1; x >= 0; x--) {
        if (x % 3 === 0) {
            newString += ' ';
        }
        newString += bigNumber[x];
    }
    return newString.split('').reverse().join('');
  }
}
