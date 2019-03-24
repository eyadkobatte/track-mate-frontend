import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  @Input() note: {
    _id: string;
    value: string;
    addedBy: {uid: string; time: Date};
  };
  @Output() onDeleteNoteItem = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  deleteNoteItem(noteId: string) {
    this.onDeleteNoteItem.emit(noteId);
  }

  getUsername(uid: string) {
    return 'Eyad Kobatte';
  }
}
