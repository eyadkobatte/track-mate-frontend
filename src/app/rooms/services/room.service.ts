import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Room} from '../room';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  roomUpdated = new Subject<Room>();

  rooms: Room[];

  constructor(private http: HttpClient) {}

  getRoomsForUser(uid: string) {
    return this.http.get<Room[]>(`${environment.apiURL}/rooms/u/${uid}`);
  }

  addPermissionsInRoom(
    room: Room,
    addingUid: string,
    adminUid: string,
    level: Number
  ) {
    this.http
      .put(`${environment.apiURL}/rooms/${room._id}`, {
        operation: 'ADD',
        uid: addingUid,
        addedBy: {
          uid: adminUid
        },
        level: level
      })
      .subscribe((room: Room) => {
        this.roomUpdated.next(room);
      });
  }

  removePermission(room: Room, permissionId: string) {
    this.http
      .put(`${environment.apiURL}/rooms/${room._id}`, {
        operation: 'REMOVE',
        _id: permissionId
      })
      .subscribe((room: Room) => {
        this.roomUpdated.next(room);
      });
  }
}
