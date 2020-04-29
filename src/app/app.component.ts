import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from './root-state/user/user.service';
import { userLoaded } from './root-state/user/user.actions';
import { Store } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private store: Store,
    private _bottomSheet: MatBottomSheet,
    private title: Title
  ) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  ngOnInit() {
    this.title.setTitle('Petly');
    const userId: string = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe((user) => {
        this.store.dispatch(userLoaded(user));
      });
    }
  }
}
