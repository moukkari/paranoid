import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../interfaces/Chat-interface';

/**
 * A simple SQL chat component.
 *
 * Uses ChatService to fetch and send data to a SQL database.
 *
 * User can see old messages, that hold data of the time sent,
 * who (nick) sent it and the message. The time is automatically
 * created at the SQL backend. The nick is either a user's
 * own (max. 10 characters) or a random Black Sabbath singers.
 *
 * User can't send a message if all the needed options aren't
 * given. The input of user's nick is disabled, if a random
 * singer is choosed.
 *
 * This component can also easily be used as an embedded component,
 * because of the added @Input variables, which determine the size
 * of the component and can user see the title (Chat).
 *
 * @author Ilmari Tyrkkö
 */

@Component({
    selector: 'app-chat',
    template: `
    <div class="container">
      <h1 *ngIf="enableTitle">Chat</h1>
      <div [ngStyle]="{'max-width': size}" class="chatMain">
        <div [ngStyle]="{'max-height': chatHeight}" class="chatBox">
            <p *ngFor="let msg of chatMessages" class="chatMsg">
              <span class="chatTime">{{formatTime(msg.time)}}</span> <br/>
              <span class="chatSender">{{msg.sender}}</span> - {{msg.msg}}
            </p>
        </div>
        <div>
          <label id="msgPick">Pick your message</label><br/>
          <mat-radio-group [(ngModel)]="msgChoice" aria-labelledby="msgPick">
            <mat-radio-button *ngFor="let choice of messageChoices" [value]="choice" class="chatRadioButton">
              {{choice}}
            </mat-radio-button>
          </mat-radio-group>
          <br/>
          <label id="nickPick">Pick your nick</label><br/>
          <mat-radio-group [(ngModel)]="inputState" aria-labelledby="nickPick">
            <mat-radio-button [value]="true" class="chatRadioButton">Your own nick</mat-radio-button>
            <mat-radio-button [value]="false" class="chatRadioButton">Random Black Sabbath singer</mat-radio-button>
          </mat-radio-group>

          <p class="validationText">{{validationText}}</p>
          <input [disabled]="!inputState" [(ngModel)]="sender" maxlength="10" placeholder="Your nick..." />
          <button (click)="sendMsg()">Send</button>
        </div>
      </div>
    </div>
    `,
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @Input() enableTitle = true;
    @Input() size = '100%';
    @Input() chatHeight = '500px';

    validationText = '';
    msgChoice = '';
    messageChoices: string[] = ['Play Paranoid!', 'Soittakaa Paranoid!'];
    sender = '';
    chatObj = { msg: '', sender: '' };
    chatMessages: ChatMessage[] = [{msg: 'msg', sender: 'default', time: '2020-05-15T17:57:04.000Z'}];
    inputState = true;
    singers = ['Ozzy Osbourne',
        'Ronny James Dio',
        'Dave Walker',
        'Ian Gillan',
        'Glenn Hughes',
        'Ron Keel',
        'David Donato',
        'Tony Martin',
        'Ray Gillen',
        'Bill Ward'];

    constructor(private chat: ChatService) { }

    ngOnInit(): void {
        this.updateChat();
    }
    // Fetches the messages from SQL database
    updateChat(): void {
        this.chat.getChatMsgs((result) => {
            this.chatMessages = result.reverse();
        });
    }
    // Sends a message to the SQL database
    sendMsg(): void {
        if ((this.sender.length >= 3 || !this.inputState) && this.msgChoice !== '') {
            let senderName = '';
            if (this.inputState) {
                senderName = this.sender;
            } else {
              senderName = this.singers[Math.floor(Math.random() * Math.floor(this.singers.length))];
            }
            this.chatObj = { msg: this.msgChoice, sender: senderName };
            console.log(this.chatObj);
            this.chat.sendMsg(this.chatObj, (response) => {
                console.log(response);
                this.updateChat();
            });
        } else {
            this.validationText = 'Please choose a message and give a nick longer than 2 characters.';
        }
    }
    // Formats the SQL DATETIME value to a local datetime format
    formatTime(time: string): string {
        const date = new Date(time).toLocaleString();
        return date;
    }
    // Ables the disable of user nick input if random singer is chosen
    changeInputState() {
        this.inputState = !this.inputState;
    }

}
