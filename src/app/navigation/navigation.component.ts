import { Component, OnInit } from '@angular/core';
import { getUserInfo } from '../root-state/user/user.selectors';
import { Store, select } from '@ngrx/store';
import { commonLinks, userLinks, sitterLinks } from './navigation.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})

export class NavigationComponent implements OnInit {
  links: any = null;
  isSitter: boolean = false;
  isUserLoggedIn: boolean = false;
  constructor(private store: Store, private router: Router) { }

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
    localStorage.removeItem('userId');
    this.router.navigate(["/"]);
    this.buildLinks({});
  }
}