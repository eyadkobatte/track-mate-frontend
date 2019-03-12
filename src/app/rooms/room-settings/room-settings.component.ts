import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Room} from '../room';
import {User} from 'src/app/home/auth/user';

@Component({
  selector: 'app-room-settings',
  templateUrl: './room-settings.component.html',
  styleUrls: ['./room-settings.component.scss']
})
export class RoomSettingsComponent implements OnInit {
  @Input() room: Room;
  @Input() users: User[];

  @Output() onSettingsClosed = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  closeSettings() {
    this.onSettingsClosed.emit();
  }
}
