import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="container-fluid main">
    <div class="row">
      <div class="col-sm">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" routerLink="/" routerLinkActive="active">Paranoid</a>
          <button class="navbar-toggler" type="button" (click)="navbarCollapsed = !navbarCollapsed"
            [attr.aria-expanded]="!navbarCollapsed" aria-controls="navbarContent" aria-expanded="false"
            aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" [ngbCollapse]="navbarCollapsed" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item">
                <a class="nav-link" routerLink="/" routerLinkActive="active">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/setlists" routerLinkActive="active">Setlists</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/spotifylists" routerLinkActive="active">Spotify data</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" routerLink="/chat" routerLinkActive="active">Chat</a>
              </li>
            </ul>
            <iframe class="floatRight" src="https://open.spotify.com/embed/track/1jzDzZWeSDBg5fhNc3tczV"
                width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
        </nav>
      </div>
    </div>
    <div class="row window">
      <div class="col-sm">
        <router-outlet></router-outlet>
      </div>
    </div>
    <div class="row">
      <div class="col-sm">
    <app-footer></app-footer>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  navbarCollapsed = true;

  constructor() {}

  ngOnInit() { }
}
