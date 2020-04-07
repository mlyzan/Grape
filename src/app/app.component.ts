import { Component, OnInit } from '@angular/core';
import { UserService } from './root-state/user/user.service';
import { Store } from '@ngrx/store';
import { userLoaded } from './root-state/user/user.actions';
import { Observable } from 'rxjs';
import { getLoading } from './root-state/sitter/sitter.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Grape';
  spinner$: Observable<boolean>
  constructor(private userService: UserService, private store: Store) {}

  ngOnInit() {
    const userId: string = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUser(userId).subscribe((user) => {
        console.log(user);
        this.store.dispatch(userLoaded(user));
        console.log(this.store)
      })
    }
    this.spinner$ = this.store.select(getLoading)
  }
}
