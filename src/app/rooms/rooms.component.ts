import {map} from 'rxjs/operators';
import {AuthService} from './../home/auth/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {RoomService} from './services/room.service';
import {ActivatedRoute} from '@angular/router';
import {Room} from './room';
import {User} from 'firebase';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: Room[];
  user: User;
  users: User[];

  roomSettings = false;
  clickedRoom: Room = null;

  newRoomInput = '';

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.data
      .pipe(map((data) => data.rooms))
      .subscribe((rooms) => {
        this.rooms = rooms;
      });
  }

  ngOnInit() {
    this.authService.userLoggedIn.subscribe((user: User) => {
      this.user = user;
    });

    this.roomService.roomUpdated.subscribe((room: Room) => {
      this.rooms.forEach((value, index) => {
        if (value._id === room._id) {
          this.rooms[index] = room;
        }
      });
    });

    let usersToFind = [];
    this.rooms.map((room: Room) => {
      usersToFind.push(room.created.uid);
      room.permissions.map((permission) => {
        usersToFind.push(permission.uid);
      });
    });
    usersToFind = usersToFind.filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

    this.roomService.roomAdded.subscribe((room: Room) => {
      console.log(room);
      this.rooms.push(room);
    });

    this.roomService.roomRemoved.subscribe((room: Room) => {
      console.log(room);
      this.rooms = this.rooms.filter((value: Room) => {
        if (!(value._id === room._id)) {
          return value;
        }
      });
    });

    this.authService
      .getUsersFromDatabase(usersToFind)
      .subscribe((users: User[]) => {
        this.users = users;
        console.log(this.users);
      });
  }

  getUserName(uid: string) {
    if (this.users)
      return this.users.filter((value) => value.uid === uid)[0].displayName;
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
}