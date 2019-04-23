import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AuthComponent} from './home/auth/auth.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HomeComponent} from './home/home.component';
import {RoomsComponent} from './rooms/rooms.component';
import {RoomSettingsComponent} from './rooms/room-settings/room-settings.component';
import {RoomDetailsComponent} from './rooms/room-details/room-details.component';
import { NotesComponent } from './rooms/room-details/notes/notes.component';
import { ListsComponent } from './rooms/room-details/lists/lists.component';
import { BuyItemComponent } from './rooms/room-details/lists/buy-item/buy-item.component';
import { RoomWalletComponent } from './rooms/room-details/room-wallet/room-wallet.component';
import { MinusSignToParensPipe } from './rooms/room-details/room-wallet/minus-sign-to-parens.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HomeComponent,
    RoomsComponent,
    RoomSettingsComponent,
    RoomDetailsComponent,
    NotesComponent,
    ListsComponent,
    BuyItemComponent,
    RoomWalletComponent,
    MinusSignToParensPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
