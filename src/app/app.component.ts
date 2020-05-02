import { Component, OnInit } from '@angular/core';
import { LastFmService } from './lastfm.service';
import { EmptyTrack, Track } from './Track-interface';
import { SpotifyService } from './spotify.service';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-fluid main">
    <div class="row">
      <div class="col-sm">
        <h1>{{paranoid.artist.name}} - {{paranoid.name}}</h1>
        <h2>{{test}}</h2>
      </div>
    </div>
    <div class="row">
      <div class="col-4 center">
        <img alt="Image" [src]="paranoidImg" />
        <iframe src="https://open.spotify.com/embed/track/1jzDzZWeSDBg5fhNc3tczV"
        width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
      </div>
      <div class="col-8 center">
        <h2>Last.fm statistics</h2>
        <h3>Playcount</h3>
        <p class="bignumber">{{paranoid.playcount}}</p>
        <h3>Listeners</h3>
        <p class="bignumber">{{paranoid.listeners}}</p>
        <iframe width="560" height="315" src="https://www.youtube.com/embed/hkXHsK4AQPs?controls=0"
          frameborder="0" allow="accelerometer; autoplay; encrypted-media;
          gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
    <hr/>
    <div class="row">
      <div class="col-9">
        <h3>About</h3>
        <p [innerHTML]="paranoid.wiki.content"></p>
      </div>
      <div class="col-3">
        <h3>Genres</h3>
        <p *ngFor="let genre of genreArray"><a href={{genre.url}}>{{genre.name}}</a></p>
      </div>
    </div>
  </div>


  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Paranoid app';
  paranoid: Track = EmptyTrack;
  paranoidImg = '';
  genreArray = [];
  test = 'test';

  constructor(private lastfm: LastFmService, private spotify: SpotifyService) {}

  ngOnInit() {
    this.lastfm.fetchData((result) => {
      console.log(result);
      this.handleResult(result);
    });
    this.spotify.fetchData((result) => {
      console.log(result);
      this.test = this.msToTime(result.duration_ms);
    });
  }

  handleResult(result) {
    this.paranoid = result;

    const imageList = this.paranoid.album.image;
    this.paranoidImg = imageList[3]['#text'];
    this.genreArray = this.paranoid.toptags.tag;
  }

  msToTime(ms: number) {
    const seconds: number = Math.floor((ms / 1000) % 60);
    const minutes: number = Math.floor((ms / (1000 * 60) % 60));
    return 'Running time: ' + minutes + ':' + seconds;
  }
}
