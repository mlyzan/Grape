import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Component, OnInit } from '@angular/core';
import { UserService } from './root-state/user/user.service';
import { userLoaded } from './root-state/user/user.actions';
import { Store } from '@ngrx/store';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Grape';
  constructor(
    private userService: UserService,
    private store: Store,
    private _bottomSheet: MatBottomSheet
  ) {}

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent);
  }

  ngOnInit() {
    const userId: string = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe((user) => {
        this.store.dispatch(userLoaded(user));
      });
    }
  }
}
