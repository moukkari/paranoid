import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { SetlistfmData } from './SetlistFm-interface';

@Injectable({
    providedIn: 'root'
})
export class Setlistfm {
  url: string;
  searchUrl: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/setlistfm/';
    this.searchUrl = 'http://localhost:3000/setlistfmsearch/';
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
