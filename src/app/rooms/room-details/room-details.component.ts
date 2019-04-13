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
  addingWhatItem: 'note' | 'list' | 'walletList';

  newNoteInput = '';
  newListNameInput = '';
  newWalletListNameInput = '';

  constructor(
    private roomService: RoomService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    let usersToFind = [];
    if (this.room) {
      usersToFind.push(this.room.created.uid);
      this.room.noteItems.forEach((note) => {
        usersToFind.push(note.addedBy.uid);
      });
      this.room.listItems.forEach((list) => {
        usersToFind.push(list.addedBy.uid);
        list.items.forEach((item) => {
          usersToFind.push(item.addedBy.uid);
        });
      });
      usersToFind = usersToFind.filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
      this.authService.storeUsers(usersToFind);
    }

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

  saveWalletList() {
    this.roomService;
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
