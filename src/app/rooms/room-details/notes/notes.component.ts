import { User } from 'src/app/home/auth/user';
import { AuthService } from './../../../home/auth/services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() note: {
    _id: string;
    value: string;
    addedBy: { uid: string; time: Date };
  };
  @Output() onDeleteNoteItem = new EventEmitter<string>();

  users: User[] = this.authService.allUsers;

  constructor(private authService: AuthService) {}

  ngOnInit() {}

  deleteNoteItem(noteId: string) {
    this.onDeleteNoteItem.emit(noteId);
  }

  getUsername(uid: string) {
    if (this.users.find(value => value.uid === uid)) {
      return this.users.find(value => value.uid === uid).displayName;
    } else {
      this.authService.getUser(uid).then(user => {
        // TODO: What am I doing with this user
      });
    }
  }
}
