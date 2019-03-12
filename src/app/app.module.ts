import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AuthComponent} from './home/auth/auth.component';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {HomeComponent} from './home/home.component';
import {RoomsComponent} from './rooms/rooms.component';
import { RoomSettingsComponent } from './rooms/room-settings/room-settings.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, HomeComponent, RoomsComponent, RoomSettingsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
