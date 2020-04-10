import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { getUserInfo } from '../root-state/user/user.selectors';
import { loadBooks } from '../root-state/sitter/sitter.actions';
import { getBooksByCustomerId } from '../root-state/sitter/sitter.selectors';
import { getActiveId } from '../root-state/user/user.selectors';
import { Book } from '../root-state/sitter/sitter.interfaces';

@Component({
  selector: 'grape-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any;
  responses: Book[];
  activeId: string;
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this._store.pipe(
      select(getActiveId)
    ).subscribe(res => this.activeId = res);
    this._store.pipe(
      select(getUserInfo)
    ).subscribe(res => this.user = res);
    this._store.dispatch(loadBooks());
    this._store.pipe(
      select(getBooksByCustomerId(this.activeId))
    ).subscribe(res => this.responses = [...res])
  }

}
