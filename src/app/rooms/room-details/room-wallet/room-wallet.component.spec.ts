import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomWalletComponent } from './room-wallet.component';

describe('RoomWalletComponent', () => {
  let component: RoomWalletComponent;
  let fixture: ComponentFixture<RoomWalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomWalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
