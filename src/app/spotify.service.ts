import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = `https://api.spotify.com/v1/tracks/1jzDzZWeSDBg5fhNc3tczV`;
  }

  fetchData(callBackFunction: (result: any) => void ): void {
    this.http.get< any >(this.url,
    { observe: 'response' }).subscribe(response => {
      callBackFunction(response.body);
    }, this.error.bind(this));
  }

  error(err: HttpErrorResponse) {
    console.log(err);
    console.log('Error: ' + err.message);
  }
}
