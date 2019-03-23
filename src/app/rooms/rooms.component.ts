import {map} from 'rxjs/operators';
import {AuthService} from './../home/auth/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {RoomService} from './services/room.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Room} from './room';
import {User} from 'firebase';
import {resolve} from 'q';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[] = [];
  user: User;
  users: User[] = [];
  roomPermissions = [];

  roomSettings = false;
  clickedRoom: Room = null;

  newRoomInput = '';

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    let usersToFind = [];

    this.authService.userLoggedIn.subscribe((user: User) => {
      this.user = user;
    });

    this.roomService.roomsRecieved.subscribe((rooms: Room[]) => {
      this.rooms = rooms;
      this.rooms.map((room: Room) => {
        usersToFind.push(room.created.uid);
        if (room.created.uid === this.user.uid) {
          this.roomPermissions.push(room._id);
        }
        room.permissions.map((permission) => {
          if (permission.uid === this.user.uid) {
            if (permission.level === 2) {
              this.roomPermissions.push(room._id);
            }
          }
          usersToFind.push(permission.uid);
        });
      });
      usersToFind = usersToFind.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.authService
        .getUsersFromDatabase(usersToFind)
        .subscribe((users: User[]) => {
          this.users = users;
        });
    });
  }

  getUserName(uid: string) {
    if (this.users.length > 0) {
      return this.users.filter((user: User) => {
        if (user.uid === uid) {
          return user;
        }
      })[0].displayName;
    }
  }

  openRoomSettings(room: Room) {
    console.log('open room settings', room);
    this.roomSettings = !this.roomSettings;
    this.clickedRoom = room;
  }

  getClickedRoom() {
    return this.clickedRoom;
  }

  closeSettings() {
    this.roomSettings = !this.roomSettings;
  }

  addNewRoom() {
    this.roomService.addNewRoom(this.newRoomInput, this.user.uid);
    this.newRoomInput = '';
  }

  goToRoom(room: Room) {
    this.router.navigate(['/r', room._id]);
  }

  canUserAccessSettings(room: Room) {
    if (this.roomPermissions.indexOf(room._id) >= 0) return true;
  }
}
