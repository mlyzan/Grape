import { Component, OnInit } from '@angular/core';
import { getUserInfo } from '../root-state/user/user.selectors';
import { Store, select } from '@ngrx/store';
import { commonLinks, userLinks, sitterLinks } from './navigation.constants';
import { Router } from '@angular/router';
import { NotificationSnackBarMessage } from '../notification-snack-bar/notification-snack-bar-message';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  links: any = null;
  isSitter: boolean = false;
  isUserLoggedIn: boolean = false;
  constructor(private store: Store, private router: Router, private _NSBM: NotificationSnackBarMessage) { }

  ngOnInit(): void {
    this.store.pipe(select(getUserInfo)).subscribe((info) => {
      this.buildLinks(info);
    });
  }

  buildLinks(info) {
    this.isUserLoggedIn = !!info.userName;
    this.isSitter = !!info.isSitter;
      if (!this.isUserLoggedIn) {
        this.links = commonLinks;
        return
      }
      this.links = info.isSitter ? sitterLinks : userLinks;
  }

  onLogOutClick() {
    this._NSBM.showSuccess('Logout is successful');
    localStorage.removeItem('userId');
    this.router.navigate(["/"]);
    this.buildLinks({});
  }

  scrollToElement($event, e): void {
    if (this.router.routerState.snapshot.url === '/') {
      $event.preventDefault();
      document.querySelector(e).scrollIntoView({behavior: "smooth", block: "start", inline: "start"});
    }
  }
}