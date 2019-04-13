import {AuthService} from './../../../home/auth/services/auth.service';
import {User} from 'src/app/home/auth/user';
import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {RoomService} from '../../services/room.service';
import {Room} from '../../room';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  @Input() room: Room;
  @Input() list: {
    _id: string;
    listName: string;
    addedBy: {
      uid: string;
      time: Date;
    };
    items: [
      {
        _id?: string;
        itemName: string;
        addedBy: {
          uid: string;
          time: Date;
        };
        enabled: boolean;
      }
    ];
  };
  @Output() onDeleteList = new EventEmitter<string>();

  newItemInput = '';

  users: User[] = this.authService.allUsers;

  constructor(
    private roomService: RoomService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  deleteList() {
    this.onDeleteList.emit(this.list._id);
  }

  getUsername(uid: string) {
    if (this.users.find((value) => value.uid === uid)) {
      console.log(uid);
      return this.users.find((value) => value.uid === uid).displayName;
    } else {
      this.authService.getUser(uid).then((user) => {
        console.log(user);
      });
    }
  }

  addNewItem() {
    this.roomService.addItemInList(
      this.room._id,
      this.list._id,
      this.newItemInput
    );
  }

  deleteItemFromList(itemId: string) {
    this.roomService.deleteItemFromList(this.room._id, this.list._id, itemId);
  }
}
