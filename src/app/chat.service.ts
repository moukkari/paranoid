import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ChatMessage } from './interfaces/Chat-interface';

/**
 * A chat service that fetches data from a node.js server
 * that connects to a SQL database.
 *
 * Includes methods for getting all messages and sending
 * a message.
 */

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    constructor(private http: HttpClient) { }

    getChatMsgs(callback: (result: ChatMessage[]) => void): void {
        console.log('getting chat messages');
        this.http.get< ChatMessage[] >('https://soittakaaparanoid.herokuapp.com/getChat', {observe: 'response'})
            .subscribe(response => {
                callback(response.body);
            });
    }
    sendMsg(msgBody: ChatMessage, callback: (result: any) => void): void {
        console.log('sending chat message');
        console.log(msgBody);
        this.http.post< ChatMessage >('https://soittakaaparanoid.herokuapp.com/sendMsg',
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
