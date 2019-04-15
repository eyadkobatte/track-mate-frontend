import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room } from 'src/app/rooms/room';

@Component({
  selector: 'app-buy-item',
  templateUrl: './buy-item.component.html',
  styleUrls: ['./buy-item.component.scss']
})
export class BuyItemComponent implements OnInit {
  @Input() item;
  @Input() room: Room;
  @Output() onCloseBuyItem = new EventEmitter();
  @Output() onBuyItem = new EventEmitter<Number>();

  amount: number = null;
  constructor() {}

  ngOnInit() {
    console.log(this.item);
  }

  closeBuyItem() {
    this.onCloseBuyItem.emit();
  }

  buyItem() {
    this.onBuyItem.emit(this.amount);
    this.closeBuyItem();
  }
}
