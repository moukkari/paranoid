import { Component, OnInit, ViewChild } from '@angular/core';
import { SpotifyService } from '../spotify.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EmptySearchData, EmptySpotifyTrack, SpotifySearchData, SpotifyTrack } from '../interfaces/Spotify-interface';

/**
 * This component show user data fetched from Spotify API.
 *
 * It uses SpotifyService to get track data and track search data from
 * Spotify API. Then it adds the search data to a table. Some of the track data
 * can be seen on a "info box". The popularity of the song is displayed in a
 * mat progress bar. User can sort table table columns. A progress spinner
 * is displayed while data is fetched.
 *
 * @author Ilmari Tyrkkö
 */

@Component({
  selector: 'app-albumtable',
  template: `
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-8">
        <h1>Spotify track and search data</h1>
        <p>Here you can find data fetched from Spotify API</p>
      </div>
      <div [hidden]="isLoading" class="col-sm-4">
        <h2>Stats from Spotify API</h2>
        <ul>
          <li>Available in {{trackData.available_markets.length}} countries</li>
          <li>Running time: {{msToTime(trackData.duration_ms)}}</li>
          <li>First release: {{trackData.album.release_date}}</li>
          <li>Spotify id: {{trackData.id}}</li>
          <li><a href={{trackData.preview_url}}>Spotify preview url (30 sec clip)</a></li>
          <li><a href={{trackData.external_urls.spotify}}>Listen on Spotify</a></li>
        </ul>
        <div class="barContainer">
           <mat-progress-bar mode="determinate" class="myProgressBar" value={{trackData.popularity}}></mat-progress-bar>
           <div class="barContainerChild">
              Popularity {{trackData.popularity}} / 100
           </div>
        </div>

      </div>
    </div>

    <div *ngIf="isLoading" class="row loader">
      <mat-spinner
          class="spinner"
          color="primary"
          mode="indeterminate">
      </mat-spinner>
      <p>Loading...</p>
    </div>

    <div [hidden]="isLoading" class="row">
    <div class="col-sm">
      <h2>Different versions of Paranoid found from Spotify</h2>
      <table mat-table [dataSource]="data" matSort width="100%" class="spotifyTable">
        <ng-container matColumnDef="name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Name </th>
          <td mat-cell *matCellDef="let element"> <a href={{element.external_urls.spotify}}> {{ element.name }} </a> </td>
        </ng-container>
        <ng-container matColumnDef="artists[0].name">
          <th mat-header-cell *matHeaderCellDef> Artist </th>
          <td mat-cell *matCellDef="let element"> {{ element.artists[0].name }} </td>
        </ng-container>
        <ng-container matColumnDef="album.name">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Album </th>
          <td mat-cell *matCellDef="let element"> <a href={{element.album.external_urls.spotify}}> {{ element.album.name }} </a> </td>
        </ng-container>
        <ng-container matColumnDef="release_date">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Release Date </th>
          <td mat-cell *matCellDef="let element"> {{ element.album.release_date }} </td>
        </ng-container>
        <ng-container matColumnDef="duration_ms">
          <th mat-header-cell *matHeaderCellDef mat-sort-header> Duration </th>
          <td mat-cell *matCellDef="let element"> {{ msToTime(element.duration_ms) }} </td>
        </ng-container>
        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>

      <mat-paginator
        [length]="count"
        [pageSize]="5"
        (page)="pageChange($event)">
      </mat-paginator>
    </div>
    </div>
  </div>
  `,
  styleUrls: ['./albumtable.component.css']
})

export class AlbumtableComponent implements OnInit {
  count = 1;
  paranoidTrackLength = '';
  isLoading: boolean;
  trackData: SpotifyTrack = EmptySpotifyTrack;
  dataSource: SpotifySearchData[] = EmptySearchData;

  displayedColumns: string[] = ['artists[0].name', 'name', 'album.name', 'release_date', 'duration_ms'];
  paginator: {limit: 5, next: '', offset: 0, previous: '', total: 0};

  data = new MatTableDataSource(this.dataSource);

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  // when isLoading is true, user can see progress spinner and divs where there is user data are hidden.
  constructor(private spotify: SpotifyService) {
    this.isLoading = true;
  }
  // At first gets a new token for using Spotify API. After that
  // fetches two kind of data and adds them local variables.
  ngOnInit(): void {
    this.spotify.fetchToken((booleanResponse: boolean) => {
      this.spotify.fetchSearchData((result) => {
        this.dataSource = result.tracks.items;
        this.count = result.tracks.total;
        this.paginator = result.tracks;
        this.isLoading = booleanResponse;
        this.data = new MatTableDataSource(this.dataSource);
        // The next ables data sorting of nested objects
        this.data.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'album.release_date': return item.album.release_date;
            case 'album.name': return item.album.name;
            default: return item[property];
          }
        };
        this.data.sort = this.sort;
      });
      this.spotify.fetchTrackData((response: SpotifyTrack) => {
        console.log(response);
        this.trackData = response;
        this.paranoidTrackLength = this.msToTime(response.duration_ms);
      });
    });
  }

  // Formats milliseconds to format MM:ss
  msToTime(ms: number) {
    const seconds: number = Math.floor((ms / 1000) % 60);
    const minutes: number = Math.floor((ms / (1000 * 60) % 60));
    return minutes + ':' + seconds;
  }

  // Sends a fetch request for new data if paginator arrow is pressed
  pageChange($event: any) {
    this.isLoading = true;
    let nextUrl = '';

    if ($event.previousPageIndex < $event.pageIndex) {
      nextUrl = this.paginator.next;
    } else {
      nextUrl = this.paginator.previous;
    }
    this.spotify.goToPage(nextUrl, (result) => {
      this.dataSource = result.tracks.items;
      this.data = new MatTableDataSource(this.dataSource);
      this.data.sort = this.sort;
      this.paginator = result.tracks;
      this.isLoading = false;
    });
  }
}
