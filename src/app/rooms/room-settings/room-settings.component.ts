import {AuthService} from './../../home/auth/services/auth.service';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Room} from '../room';
import {User} from 'src/app/home/auth/user';
import {FormControl} from '@angular/forms';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss']
})
export class RoomSettingsComponent implements OnInit {
  @Input() room: Room;
  @Input() users: User[];
  @Input() user: User;

  @Output() onSettingsClosed = new EventEmitter();
  addPermission = false;

  emailInPermissionForm: string = '';
  levelInPermissionForm: Number = 0;

  constructor(
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit() {
    this.roomService.roomUpdated.subscribe((room: Room) => {
      if (this.room._id === room._id) this.room = room;
    });
  }

  closeSettings() {
    this.onSettingsClosed.emit();
  }

  getUsername(uid: string) {
    if (this.users.length > 0) {
      return this.users.find((user) => user.uid === uid).displayName;
    } else return 'User';
  }

  getUserPhoto(uid: string): string {
    if (this.users.length > 0) {
      return this.users.find((user) => user.uid === uid).photoURL;
    } else return 'https://png.pngtree.com/svg/20161027/631929649c.svg';
  }

  getPermissionLevel(level: number) {
    return level === 2 ? 'Admin' : level === 1 ? 'Add' : 'View';
  }

  submitPermissionForm() {
    console.log('submitted');
    this.authService
      .getUserFromEmailInDatabase(this.emailInPermissionForm)
      .subscribe((user: User) => {
        if (user) {
          if (
            this.room.permissions.find(
              (permission) => permission.uid === user.uid
            )
          ) {
            window.alert('User already added');
          } else if (user.uid === this.room.created.uid) {
            window.alert('User is creator. no need to add permission');
          } else {
            this.roomService.addPermissionsInRoom(
              this.room,
              user.uid,
              this.user.uid,
              this.levelInPermissionForm
            );
          }
        }
      });
    this.emailInPermissionForm = '';
  }

  removePermission(room: Room, permissionId: string) {
    this.roomService.removePermission(room, permissionId);
  }

  deleteRoom(room: Room) {
    this.onSettingsClosed.emit();
    this.roomService.deleteRoom(room);
  }
}
