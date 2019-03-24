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

  addingNewItem = false;
  addingWhatItem: 'note' | 'list' | 'table';

  newNoteInput = '';
  newListNameInput = '';

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
    this.addingNewItem = false;
  }

  saveList() {
    this.roomService.addNewList(this.roomId, this.newListNameInput);
    this.newListNameInput = '';
    this.addingNewItem = false;
  }

  getUsername(uid: string) {
    // this.authService
    //   .getUserFromUIDInDatabase(uid)
    //   .then((user) => {
    //     console.log(user);
    //     return user;
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    return 'Eyad Kobatte';
  }

  deleteNoteItem(noteId: string) {
    this.roomService.deleteNoteInRoom(this.roomId, noteId);
  }

  deleteList(listId: string) {
    this.roomService.deleteListFromRoom(this.roomId, listId);
  }
}
