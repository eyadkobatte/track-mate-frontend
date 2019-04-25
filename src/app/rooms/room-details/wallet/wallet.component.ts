import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../../room';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  @Input() room: Room;
  dues: { uid: string; amount: Number }[] = [];

  constructor() {}

  ngOnInit() {
    this.room.listItems.forEach(list => {
      if (list.isWallet === true) {
        list.items.forEach(item => {
          if (item.bought != null) {
            item.dues.forEach(due => {
              this.dues.push({ uid: due.uid, amount: due.amount });
            });
          }
        });
      }
    });
    console.log('dues', this.dues);
  }
}
