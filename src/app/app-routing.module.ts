import {AuthGuard} from './home/auth/guards/auth.guard';
import {HomeComponent} from './home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomResolverService} from './rooms/resolver/room-resolver.service';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'u/:uid',
    component: RoomsComponent,
    canActivate: [AuthGuard],
    resolve: {
      rooms: RoomResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
