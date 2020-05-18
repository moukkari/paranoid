/**
 * This service provides data from Spotify API
 * When fetching data from Spotify API, you need a bearer token.
 * A working bearer (this.accesToken) token can be updated with the fetchToken method
 *
 * @author Ilmari Tyrkkö
 *
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  paranoidTrackUrl: string;
  paranoidSearchUrl: string;
  tokenUrl: string;
  accessToken: string;

  constructor(private http: HttpClient) {
    this.accessToken = ''; // `BQBFTewxhVoBZwyinqOXTrENU0e6smgaV0qBX2CZ09AXp_pzZUzLa6mLlOYO3WOc02i6aEPSK1e530zPzHw`;
    this.paranoidTrackUrl = `https://api.spotify.com/v1/tracks/1jzDzZWeSDBg5fhNc3tczV`;
    this.paranoidSearchUrl =
      `https://api.spotify.com/v1/search?q=track:paranoid+artist:black+sabbath&type=track&limit=5`;
    this.tokenUrl = 'https://accounts.spotify.com/api/token';
  }

  fetchToken(callBackFunction: (isLoading: boolean) => void ): void {
    const cIdcScrt = 'NDVhYTA5MTZjODYxNGJhYmFjNTY2YWFiMmI0ZDkzOGE6MWM1NzY0YWY4M2RlNGQ0YmEyODEwYTY5NmI4NGNhZTk=';
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + cIdcScrt);
    const body = new HttpParams().set('grant_type', 'client_credentials');

    this.http.post< any >(this.tokenUrl, body, { headers }).subscribe(response => {
      this.accessToken = response.access_token;
      localStorage.setItem('spotifyToken', response.access_token);
      callBackFunction(false);
      // console.log(this.accessToken);
    }, this.error.bind(this));
    // console.log(this.accessToken);
}

  // Fetches search results from Spotify API
  fetchSearchData(callBackFunction: (result: any) => void ): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    // console.log(this.accessToken);
    if (this.accessToken !== '') {
      this.http.get< any >(this.paranoidSearchUrl,
      { observe: 'response', headers }).subscribe(response => {
        callBackFunction(response.body);
      }, this.error.bind(this));
    } else {
      const response = { tracks: { items: [{album_type: 'null', artists: [0, 1],
      album: {name: 'empty', release_date: '2020-00-00', href: '', external_urls: {spotify: ''}},
      available_markets: ['fi'], external_urls: {spotify: ''}, href: '', id: '',
      images: [], name: 'empty', release_date: '2020', release_date_precision: 'year',
      total_tracks: 1, type: 'single', uri: '', duration_ms: 0}]}};
      callBackFunction(response);
    }
  }

  // Fetches track data from Spotify
  fetchTrackData(callBackFunction: (result: any) => void ): void {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    // console.log(this.accessToken);
    if (this.accessToken !== '') {
      this.http.get< any >(this.paranoidTrackUrl,
      { observe: 'response', headers }).subscribe(response => {
        callBackFunction(response.body);
      }, this.error.bind(this));
    }
  }

  // If a http get ends in error, this method is called
  error(err: HttpErrorResponse) {
    console.log(err);
  }

  goToPage(url: string, callBackFunction: (result: any) => void) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.accessToken);
    this.http.get< any >(url,
        {observe: 'response', headers}).subscribe(response => {
            callBackFunction(response.body);
        }, this.error.bind(this));
}
}
