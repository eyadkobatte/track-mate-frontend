import {AuthService} from './../../home/auth/services/auth.service';
import {ActivatedRoute, Params} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {RoomService} from '../services/room.service';
import {Room} from '../room';

@Component({
  selector: 'app-room-details',
  templateUrl: './room-details.component.html',
  styleUrls: ['./room-details.component.scss']
})
export class RoomDetailsComponent implements OnInit {
  roomId: string;
  room: Room;

  addingNewNote = false;
  newNoteInput = '';
  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.roomId = params['id'];
      this.roomService.getRoom(this.roomId).subscribe((room: Room) => {
        this.room = room;
      });
    });
    this.roomService.roomUpdated.subscribe((room: Room) => {
      if (this.room._id === room._id) {
        this.room = room;
      }
    });
  }

  saveNote() {
    this.roomService.addNewNote(this.roomId, this.newNoteInput);
    this.newNoteInput = '';
    this.addingNewNote = false;
  }

  getUsername(uid: string) {
    // return this.authService.getUserFromUIDInDatabase(uid).subscribe(
    //   (user) => {
    //     return user;
    //   },
    //   (error) => {
    //     console.error(error);
    //   }
    // );
  }
}
