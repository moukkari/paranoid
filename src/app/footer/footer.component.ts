import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="footerMain">
    <h1>Footer</h1>
    <p>This site has been developed by Ilmari Tyrkkö as project work for an Angular framework course.
      Site's purpose is to fetch all kind of REST API data of the Black Sabbath song, Paranoid.
      The data is fetched from Last.fm, Spotify and Setlist.fm APIs.
    </p>
  </div>`,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
