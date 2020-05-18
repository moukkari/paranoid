import { Component, OnInit, ViewChild } from '@angular/core';
import { Setlistfm } from '../setlistfm.service';
import { SetlistfmData, EmptySetlistfmData } from '../interfaces/SetlistFm-interface';
import { MatPaginator } from '@angular/material/paginator';

/**
 * This component ables to user to see Black Sabbath setlists from the past.
 *
 * The data is fetched from Setlist.Fm API using SetlistFmService.
 *
 * When first loaded the component automatically fetches all concert data from
 * the API. A progress spinner can be seen during fetching. Then the data is
 * inserted to a mat table. User can see a set of 20 gigs a time and can move
 * to another page using paginator.
 *
 * The table shows the following information of a gig: Date, tour Name, location,
 * venue, setlist and if Paranoid was played on that gig.
 * - The date has a link to a Setlist.fm page for more information about the gig.
 * - The location has a link to Google Maps based on coordinates given from Setlist.fm
 * - The setlist can be seen as modal after button click. Paranoid is seen in red font.
 * - If Paranoid was played on a particular gig, user can see a "sign of horns" emoji,
 *   else user will see a unamused emoji.
 *
 * User can also search for gigs from the Setlist.fm API database with city, year or
 * tour name criteria. These inputs are validated on user input. There is also a
 * little data validation at the backend.
 *
 * The page layout is modified by many booleans (more told before constructor)
 * that are inserted to ngIfs.
 *
 * @author Ilmari Tyrkkö
 */

@Component({
  selector: 'app-setlists',
  template: `
<h1>Setlist.fm data of Black Sabbath concerts</h1>
<form #searchForm="ngForm">
  <div class="form-row">
    <div class="col-lg-2 col-sm-3">
      <label for="city">City</label>
      <input id="city" class="form-control" #city="ngModel" type="text" name="city"
        [(ngModel)]="searchObj.cityName" pattern="^$|^[a-zA-Z ]*$" placeholder="Helsinki" />
      <div [hidden]="city.valid || city.pristine" class="validationText">Must contain only letters.</div>
    </div>
    <div class="col-lg-2 col-sm-3">
      <label for="year">Year</label>
      <input id="year" class="form-control" #year="ngModel" type="number" name="year"
        [(ngModel)]="searchObj.year" pattern="(^$|(19|20)[0-9]{2})" placeholder="1983" />
      <div [hidden]="year.valid || year.pristine" class="validationText">Must be 4 numbers long and start with 19 or 20.</div>
    </div>
    <div class="col-lg-2 col-sm-3">
      <label for="tour">Tour</label>
      <input id="tour" class="form-control" #tour="ngModel" type="text" name="tour"
        [(ngModel)]="searchObj.tourName" pattern="^$|^[a-zA-Z ]*$" placeholder="Born Again" />
      <div [hidden]="tour.valid || tour.pristine" class="validationText">Must contain only letters.</div>
    </div>
    <div class="col-lg-2 col-sm-3 buttonContainer">
      <button [disabled]="!searchForm.valid" type="button" class="btn btn-primary myButton" (click)="searchData()">Search</button>
    </div>
    <div class="col-lg-4 col-sm-12 buttonContainer">
      <button type="button" class="btn btn-primary myButton" (click)="fetchAll()">Show all gigs</button>
    </div>
  </div>
</form>

<div *ngIf="isLoading" class="loader">
  <mat-spinner
      class="spinner"
      color="primary"
      mode="indeterminate">
  </mat-spinner>
  <p>Loading...</p>
</div>
<div *ngIf="noResultsFound">No results found</div>
<div *ngIf="!noResultsFound">
<table mat-table [dataSource]="data.setlist" class="myMatTable">
  <ng-container matColumnDef="Event Date">
    <th mat-header-cell *matHeaderCellDef> Date </th>
    <td mat-cell *matCellDef="let element"> <a href={{element.url}}> {{ element.eventDate }} </a> </td>
  </ng-container>
  <ng-container matColumnDef="Place">
    <th mat-header-cell *matHeaderCellDef> Location </th>
    <td mat-cell *matCellDef="let element">
        <a href="http://www.google.com/maps/place/{{element.venue.city.coords.lat}},{{element.venue.city.coords.long}}">
          {{ element.venue.city.name }}, {{ element.venue.city.country.name}}
        </a>
    </td>
  </ng-container>
  <ng-container matColumnDef="Venue">
    <th mat-header-cell *matHeaderCellDef> Venue </th>
    <td mat-cell *matCellDef="let element"> {{ element.venue.name }} </td>
  </ng-container>
  <ng-container matColumnDef="Tour">
    <th mat-header-cell *matHeaderCellDef> Tour </th>
    <td mat-cell *matCellDef="let element"> {{ element.tour.name }} </td>
  </ng-container>
  <ng-container matColumnDef="Paranoid">
    <th mat-header-cell *matHeaderCellDef class="emoji"> Paranoid was played </th>
    <td mat-cell *matCellDef="let element" class="emoji">
      <span  *ngIf="element.paranoidPlayed; else notPlayedBlock"> 🤘 </span>
      <ng-template #notPlayedBlock> 😒 </ng-template>
    </td>
  </ng-container>

  <ng-container matColumnDef="Setlist">
    <th mat-header-cell *matHeaderCellDef> Setlist </th>
    <td mat-cell *matCellDef="let element">
      <span *ngIf="!element.showMe; else elseBlock">
        <button type="button" class="btn btn-info btn-sm" (click)="element.showMe = !element.showMe">Show Setlist</button>
      </span>
      <ng-template #elseBlock>
        <div class="setlistModalWrapper" *ngIf="element.sets.set[0] != undefined; else noSetlist">
        <div class="setlistModal">
          <button type="button" class="btn btn-danger btn-sm floatRight"
            (click)="element.showMe = !element.showMe">Hide setlist</button>
          <h5>Main set</h5>
          <ol>
            <li *ngFor="let song of element.sets.set[0].song">
              <span *ngIf="song.name === 'Paranoid'; else songBlock" class="PARANOID">{{song.name}}</span>
              <ng-template #songBlock>{{song.name}}</ng-template>
            </li>
          </ol>
          <span *ngIf="element.sets.set[1] != undefined">
            <h5>Encore</h5>
            <ol>
              <li *ngFor="let song of element.sets.set[1].song">
                <span *ngIf="song.name === 'Paranoid'; else songBlock" class="PARANOID">{{song.name}}</span>
                <ng-template #songBlock>{{song.name}}</ng-template>
              </li>
            </ol>
          </span>
        </div>
        </div>
        <ng-template #noSetlist>
          <div class="setlistModalWrapper">
            <div class="setlistModal">
              <button type="button" class="btn btn-danger btn-sm floatRight"
                (click)="element.showMe = !element.showMe">Hide setlist</button>
              <h4>No setlist found from database</h4>
            </div>
          </div>
        </ng-template>
      </ng-template>
    </td>
  </ng-container>

  <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
</table>


</div>
<mat-paginator [hidden]="isLoading" #paginator
  [length]="count"
  [pageSize]="20"
  (page)="pageChange($event)">
</mat-paginator>
  `,
  styleUrls: ['./setlists.component.css']
})
export class SetlistsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  data: SetlistfmData = EmptySetlistfmData;
  count = 20;
  displayedColumns = ['Event Date', 'Tour', 'Place', 'Venue', 'Setlist', 'Paranoid'];
  isLoading: boolean;
  searchObj = { cityName: '', year: null, tourName: '' };
  userHasSearchedData: boolean;
  noResultsFound: boolean;

  // isLoading is true while data is fetched,
  // userHasSearchedData is true while a search request is the last fetch request,
  // noResultsFound is true if search requests returns no data
  constructor(private setlistfm: Setlistfm) {
    this.isLoading = true;
    this.userHasSearchedData = false;
    this.noResultsFound = true;
  }

  ngOnInit(): void {
    this.fetchAll();
  }

  // fetches all gigs
  fetchAll(pageNumber: string = '1') {
    this.isLoading = true;
    this.userHasSearchedData = false;
    this.setlistfm.fetchData(pageNumber, (result) => {
      this.data = result;

      // adding boolean values for additional features on UI
      for ( const setlist of this.data.setlist ) {
        setlist.showMe = false;
        setlist.paranoidPlayed = false;
        for (const set of setlist.sets.set) {
          // console.log(i);
          for (const song of set.song) {
            if (song.name === 'Paranoid') {
              setlist.paranoidPlayed = true;
            }
          }
        }
      }
      this.count = result.total;
      this.isLoading = false;
      this.noResultsFound = false;
      if (pageNumber === '1') {
        this.paginator.firstPage();
      }
    });
  }

  // Gives a search request based on user given criteria
  searchData(pageNumber: string = '1'): void {
    this.isLoading = true;
    this.userHasSearchedData = true;
    this.setlistfm.searchData(pageNumber, this.searchObj, (result) => {
      if (result.code === 404) {
        this.noResultsFound = true;
      } else {
        // adding a boolean value for every setlist to control show/hide setlist
        for ( const setlist of result.setlist ) {
          setlist.showMe = false;
          setlist.paranoidPlayed = false;
          if (setlist.tour === undefined) {
            setlist.tour = { name: 'No tour defined' };
          }
          for (const set of setlist.sets.set) {
            for (const song of set.song) {
              if (song.name === 'Paranoid') {
                setlist.paranoidPlayed = true;
              }
            }
          }
        }
        this.data = result;
        this.count = result.total;
        if (pageNumber === '1') {
          this.paginator.firstPage();
        }
        this.noResultsFound = false;
      }
      this.isLoading = false;
    });
  }

  // Changes the paginator page
  pageChange($event: any): void {
    const pageNumber: string = $event.pageIndex + 1;
    if (this.userHasSearchedData) {
      this.searchData(pageNumber);
    } else {
      this.fetchAll(pageNumber);
    }
  }
}
