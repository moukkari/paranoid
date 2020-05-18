import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Track } from './interfaces/Track-interface';

/**
 * A service that fetches data from Last.fm API and sends it
 * forward with callback functions.
 */

@Injectable({
    providedIn: 'root'
})
export class LastFmService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo
      &api_key=115a1f97dfddf2e7815f2e6edc066dce&artist=Black+Sabbath&track=Paranoid&format=json`;
  }

  fetchData(callBackFunction: (result: Track) => void ): void {
    this.http.get< any >(this.url,
    { observe: 'response' }).subscribe(response => {
      callBackFunction(response.body.track);
    }, this.error.bind(this));
  }

  error(err: HttpErrorResponse) {
    console.log(err);
    console.log('Error: ' + err.message);
  }
}
