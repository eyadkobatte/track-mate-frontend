import {AuthService} from './../../../home/auth/services/auth.service';
import {Component, OnInit, Input} from '@angular/core';
import {Room} from '../../room';
import {User} from '../../../home/auth/user';

@Component({
  selector: 'app-room-wallet',
  templateUrl: './room-wallet.component.html',
  styleUrls: ['./room-wallet.component.scss']
})
export class RoomWalletComponent implements OnInit {
  @Input() room: Room;
  transactions: {uid: string; amount: number}[] = [];
  users: User[] = this.authService.allUsers;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.room.listItems.map((list) => {
      if (list.isWallet === true) {
        list.items.map((item) => {
          if (item.bought != null) {
            item.dues.map((due) => {
              let transactionIndex = this.transactions.findIndex(
                (transaction) => transaction.uid === due.uid
              );
              if (transactionIndex < 0) {
                this.transactions.push({uid: due.uid, amount: due.amount});
              } else {
                this.transactions[transactionIndex].amount += due.amount;
              }
            });
          }
        });
      }
    });
    console.log(this.transactions);
  }

  getUsername(uid: string) {
    if (this.users.find((value) => value.uid === uid)) {
      return this.users.find((value) => value.uid === uid).displayName;
    } else {
      this.authService.getUser(uid).then((user) => {
        // TODO: What am i doing with this user
      });
    }
  }
}
