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
  roomsRecieved = new Subject<Room[]>();
  roomAdded = new Subject<Room>();
  roomRemoved = new Subject<Room>();

  rooms: Room[] = [];

  constructor(private http: HttpClient) {
    this.roomsRecieved.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      console.log('recieved rooms in service', this.rooms);
    });
  }

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
        this.rooms.forEach((value: Room, index: number) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
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
        this.rooms.forEach((value: Room, index: number) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomUpdated.next(room);
      });
  }

  addNewRoom(roomName, uid) {
    this.http
      .post(`${environment.apiURL}/rooms/`, {
        roomName: roomName,
        description: 'Room created using Angular',
        created: {
          uid: uid
        }
      })
      .subscribe((room: Room) => {
        this.rooms.push(room);
        this.roomAdded.next(room);
      });
  }

  deleteRoom(room: Room) {
    this.http
      .delete(`${environment.apiURL}/rooms/${room._id}`)
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (!(value._id === room._id)) {
            return value;
          }
        });
        this.roomRemoved.next(room);
      });
  }
}
