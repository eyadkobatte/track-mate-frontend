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

  constructor(private roomService: RoomService) {}

  ngOnInit() {}

  deleteList() {
    this.onDeleteList.emit(this.list._id);
  }

  getUsername(uid: string) {
    return 'Eyad Kobatte';
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
