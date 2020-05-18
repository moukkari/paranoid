import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SetlistsComponent } from './setlists/setlists.component';
import { AlbumtableComponent } from './albumtable/albumtable.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  { path: '', component: LandingComponent, pathMatch: 'full' },
  { path: 'setlists', component: SetlistsComponent },
  { path: 'spotifylists', component: AlbumtableComponent},
  { path: 'chat', component: ChatComponent},
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
