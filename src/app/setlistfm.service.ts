import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SetlistfmData } from './interfaces/SetlistFm-interface';

/**
 * A service that fetches Setlist.fm API data using
 * a middleware server.
 *
 * There are methods for fetching all Black Sabbath concert data
 * and one for searching data of Black Sabbath concerts.
 */

@Injectable({
    providedIn: 'root'
})
export class Setlistfm {
  url: string;
  searchUrl: string;

  constructor(private http: HttpClient) {
    this.url = 'https://soittakaaparanoid.herokuapp.com/setlistfm/';
    this.searchUrl = 'https://soittakaaparanoid.herokuapp.com/setlistfmsearch/';
  }

  fetchData(page: string, callBackFunction: (result: SetlistfmData) => void ): void {
    this.http.get< any >(this.url + page,
      { observe: 'response' }).subscribe(response => {
        callBackFunction(response.body);
      }, this.error.bind(this));
  }

  searchData(page: string, searchObj: any, callBackFunction: (result: any) => void ): void {
    console.log(searchObj);
    this.http.post< any >(this.searchUrl + page, searchObj,
      { observe: 'response' }).subscribe(response => {
        callBackFunction(response.body);
      }, this.error.bind(this));
  }

  error(err: HttpErrorResponse) {
    console.log(err);
  }
}
