import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment.prod';
import { Room } from '../room';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  constructor(private http: HttpClient) {}

  getRoomsForUser(uid: string) {
    return this.http.get<Room[]>(`${environment.apiURL}/rooms/u/${uid}`);
  }
}
