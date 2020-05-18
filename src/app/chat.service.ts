import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { ChatMessage } from './Chat-interface';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient) { }

    getChatMsgs(callback: (result: ChatMessage[]) => void): void {
        console.log('getting chat messages');
        this.http.get< ChatMessage[] >('http://localhost:3000/getChat', {observe: 'response'})
            .subscribe(response => {
                callback(response.body);
            });
    }
    sendMsg(msgBody: ChatMessage, callback: (result: any) => void): void {
        console.log('sending chat message');
        console.log(msgBody);
        this.http.post< ChatMessage >('http://localhost:3000/sendMsg',
            JSON.stringify(msgBody),
            {
              headers : new HttpHeaders({'Content-Type': 'application/json'}),
              observe: 'response'
            })
            .subscribe(response => {
                callback(response);
            }), this.error.bind(this);
    }
    error(err: HttpErrorResponse) {
        console.log('ERROR');
        console.log(err);
    }
}
