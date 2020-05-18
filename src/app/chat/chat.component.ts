import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../chat.service';
import { ChatMessage } from '../Chat-interface';

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
    updateChat(): void {
        this.chat.getChatMsgs((result) => {
            this.chatMessages = result.reverse();
        });
    }
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
    formatTime(time: string): string {
        const date = new Date(time).toLocaleString();
        return date;
    }
    changeInputState() {
        this.inputState = !this.inputState;
    }

}
