import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { getUserInfo } from './../root-state/user/user.selectors';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss'],
})
export class BottomSheetComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  isSitter: boolean = false;
  isUserLoggedIn: boolean = false;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.store.pipe(select(getUserInfo)).subscribe((info) => {
        this.buildLinks(info);
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  buildLinks(info) {
    this.isUserLoggedIn = !!info.userName;
    this.isSitter = !!info.isSitter;
  }
}
