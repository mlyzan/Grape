import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserInfo, getUpdateInfo } from '../root-state/user/user.selectors';
import {loadBooks, declineBook, loadSitters, addBook} from '../root-state/sitter/sitter.actions';
import {getActiveSitterById, getBooksByCustomerId} from '../root-state/sitter/sitter.selectors';
import { getActiveId } from '../root-state/user/user.selectors';
import { Book } from '../root-state/sitter/sitter.interfaces';
import { Router } from '@angular/router';
import { UserInterfaces} from '../root-state/user/user.interfaces';
import {getUserOrders} from '../root-state/board/board.selectors';
import {Order} from '../root-state/board/board.interfaces';
import {loadOrders} from '../root-state/board/board.actions';

@Component({
  selector: 'grape-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: UserInterfaces = {
    userId: '',
    userName: '',
    userEmail: '',
    updateInfo: {
      animals: [],
      photo: '',
      years: '',
      address: ''
    }
  };
  responses: Book[] = [];
  activeId: string;
  myOrders: Order[] = [];
  constructor(private _store: Store, private _router: Router) { }

  ngOnInit(): void {
    this._store.dispatch(loadSitters());
    this._store.dispatch(loadBooks());
    this._store.dispatch(loadOrders());
    this._store.pipe(
      select(getActiveId)
    ).subscribe(res => this.activeId = res);
    this._store.pipe(
      select(getUserInfo)
    ).subscribe(res => this.user = res);
    setTimeout(() => {
      this._store.pipe(
        select(getBooksByCustomerId(this.activeId))
      ).subscribe(res => this.responses = res);
    }, 1000);
    setTimeout(() => {
      this._store.pipe(
        select(getUserOrders(this.activeId))
      ).subscribe(res => this.myOrders = res);
    }, 1500);
  }

  onDecline(id: string): void {
    this._store.dispatch(declineBook(id));
    setTimeout(() => {
      this._store.dispatch(loadBooks());
      this._store.pipe(
        select(getBooksByCustomerId(this.activeId))
      ).subscribe(res => this.responses = res);
    }, 1000)
  }

  switchToUpdate(): void {
    this._router.navigateByUrl('profile-update')
  }

  getUser(id: string) {
    let name: string, email: string;
    this._store.pipe(
      select(getActiveSitterById(id))
    ).subscribe(res => {
      name = res.userName;
      email = res.userEmail;
    });
    return {
      name,
      email
    }
  }

  bookSitter(id: string, info: string ) {
    this._store.dispatch(addBook({
      contactInfo: info,
      userId: id,
      name: this.user.userName,
      isBooked: false,
      isComplete: false,
      whoBookedId: this.activeId,
      sitterName: this.getUser(id).name
    }));
  }

}
