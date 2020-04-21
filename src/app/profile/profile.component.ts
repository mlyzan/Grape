import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {getUserInfo, getUpdateInfo} from '../root-state/user/user.selectors';
import {loadBooks, declineBook, loadSitters, addBook} from '../root-state/sitter/sitter.actions';
import {getActiveSitterById, getBooksByCustomerId} from '../root-state/sitter/sitter.selectors';
import {getActiveId} from '../root-state/user/user.selectors';
import {Book} from '../root-state/sitter/sitter.interfaces';
import {Router} from '@angular/router';
import {UserInterfaces} from '../root-state/user/user.interfaces';
import {getUserOrders} from '../root-state/board/board.selectors';
import {Order} from '../root-state/board/board.interfaces';
import {loadOrders, deleteOrder, removeOffer} from '../root-state/board/board.actions';
import {Subscription} from 'rxjs';

@Component({
  selector: 'grape-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
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

  constructor(private _store: Store, private _router: Router) {
  }

  ngOnInit(): void {
    this._store.dispatch(loadSitters());
    this._store.dispatch(loadBooks());
    this._store.dispatch(loadOrders());

    this.subscriptions.push(this._store.pipe(
      select(getActiveId)
    ).subscribe(res => this.activeId = res));

    this.subscriptions.push(this._store.pipe(
      select(getUserInfo)
    ).subscribe(res => this.user = res));

    setTimeout(() => {
      this.subscriptions.push(this._store.pipe(
        select(getBooksByCustomerId(this.activeId))
      ).subscribe(res => this.responses = res));
    }, 1000);
    setTimeout(() => {
      this.subscriptions.push(this._store.pipe(
        select(getUserOrders(this.activeId))
      ).subscribe(res => this.myOrders = res));
    }, 1500);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onDecline(id: string): void {
    this._store.dispatch(declineBook(id));
    setTimeout(() => {
      this._store.dispatch(loadBooks());
      this.subscriptions.push(this._store.pipe(
        select(getBooksByCustomerId(this.activeId))
      ).subscribe(res => this.responses = res));
    }, 1000);
  }

  switchToUpdate(): void {
    this._router.navigateByUrl('profile-update');
  }

  getUser(id: string) {
    let name: string, email: string, photo: string;
    this.subscriptions.push(this._store.pipe(
      select(getActiveSitterById(id))
    ).subscribe(res => {
      name = res.userName;
      email = res.userEmail;
      photo = res.photo;
    }));
    return {
      name,
      email,
      photo
    };
  }

  bookSitter(id: string, info: string, orderId: string) {
    this._store.dispatch(addBook({
      contactInfo: info,
      userId: id,
      name: this.user.userName,
      isBooked: false,
      isComplete: false,
      whoBookedId: this.activeId,
      sitterName: this.getUser(id).name
    }));
    setTimeout(() => {
      this._store.dispatch(removeOffer(orderId, id));
    }, 500);
    setTimeout(() => {
      this._store.dispatch(loadOrders());
      this.subscriptions.push(this._store.pipe(
        select(getUserOrders(this.activeId))
      ).subscribe(res => this.myOrders = res));
    }, 1000);
  }

  onDeleteOffer(id: string) {
    this._store.dispatch(deleteOrder(id));
    setTimeout(() => {
      this._store.dispatch(loadOrders());
      this.subscriptions.push(this._store.pipe(
        select(getUserOrders(this.activeId))
      ).subscribe(res => this.myOrders = res));
    }, 1000);
  }

  onRemoveOffer(id: string, sitterId: string) {
    this._store.dispatch(removeOffer(id, sitterId));
    setTimeout(() => {
      this._store.dispatch(loadOrders());
      this.subscriptions.push(this._store.pipe(
        select(getUserOrders(this.activeId))
      ).subscribe(res => this.myOrders = res));
    }, 1000);
  }

  loadOrders() {
    this._store.dispatch(loadOrders());
    this._store.dispatch(loadSitters());
    this._store.dispatch(loadBooks());

    this.subscriptions.push(this._store.pipe(
      select(getUserOrders(this.activeId))
    ).subscribe(res => this.myOrders = res));
  }

}
