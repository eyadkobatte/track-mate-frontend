import {User} from 'firebase';
import {AuthService} from './../../home/auth/services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {Room} from '../room';
import {Subject, Observable, BehaviorSubject} from 'rxjs';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomService implements Resolve<Room[]> {
  roomsRecieved = new BehaviorSubject<Room[]>(null);
  roomUpdated = new Subject<Room>();

  rooms: Room[] = [];
  user: User = null;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.authService.userLoggedIn.subscribe((user: User) => {
      this.user = user;
    });
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Observable<never> {
    let uid = route.paramMap.get('uid');
    let getRooms = this.http.get<Room[]>(
      `${environment.apiURL}/rooms/u/${uid}`
    );
    getRooms.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.roomsRecieved.next(this.rooms);
    });
    return getRooms;
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
        this.roomsRecieved.next(this.rooms);
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
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  addNewRoom(roomName: string, uid: string) {
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
        this.roomsRecieved.next(this.rooms);
      });
  }

  deleteRoom(room: Room) {
    this.http
      .delete(`${environment.apiURL}/rooms/${room._id}`)
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value: Room) => {
          if (!(value._id === room._id)) {
            return value;
          }
        });
        this.roomsRecieved.next(this.rooms);
      });
  }

  getRoom(roomId: string) {
    return this.http.get(`${environment.apiURL}/rooms/r/${roomId}`);
  }

  addNewNote(roomID: string, note: string) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomID}/note`, {
        operation: 'ADD',
        value: note,
        addedBy: {
          uid: this.user.uid
        }
      })
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = value;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  addNewList(roomId: string, listName: string, isWallet: boolean) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomId}/list`, {
        operation: 'ADD',
        listName: listName,
        isWallet: isWallet,
        addedBy: {
          uid: this.user.uid
        }
      })
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = value;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  deleteNoteInRoom(roomId: string, noteId: string) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomId}/note`, {
        operation: 'REMOVE',
        _id: noteId
      })
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  deleteListFromRoom(roomId: string, listId: string) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomId}/list`, {
        operation: 'REMOVE',
        _id: listId
      })
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  addItemInList(roomId: string, listId: string, itemName: string) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomId}/list/${listId}/item`, {
        operation: 'ADD',
        itemName: itemName,
        addedBy: {
          uid: this.user.uid
        }
      })
      .subscribe((room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  deleteItemFromList(roomId: string, listId: string, itemId: string) {
    this.http
      .put<Room>(`${environment.apiURL}/rooms/${roomId}/list/${listId}/item`, {
        operation: 'REMOVE',
        _id: itemId
      })
      .subscribe((room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }

  buyItemInList(
    roomId: string,
    listId: string,
    itemId: string,
    amount: number
  ) {
    const user = this.authService.currentlyLoggedInUser;

    const usersInRoom = [];
    const room = this.rooms.find((value) => value._id === roomId);

    usersInRoom.push(room.created.uid);
    room.permissions.map((value) => usersInRoom.push(value.uid));

    const dues = [];

    const perPerson = amount / usersInRoom.length;

    usersInRoom.map((uid) => {
      if (uid === user.uid) {
        dues.push({
          uid: uid,
          amount: amount - perPerson
        });
      } else {
        dues.push({
          uid: uid,
          amount: -perPerson
        });
      }
    });

    this.http
      .put<Room>(
        `${
          environment.apiURL
        }/rooms/${roomId}/list/${listId}/item/${itemId}/transaction`,
        {
          bought: {
            uid: user.uid,
            time: new Date(),
            amount: amount
          },
          dues: dues
        }
      )
      .subscribe((room: Room) => {
        this.rooms = this.rooms.filter((value, index) => {
          if (value._id === room._id) {
            this.rooms[index] = room;
          }
        });
        this.roomsRecieved.next(this.rooms);
        this.roomUpdated.next(room);
      });
  }
}
