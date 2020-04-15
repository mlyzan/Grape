import { getActiveName } from './../../root-state/user/user.selectors';
import { addBook } from './../../root-state/sitter/sitter.actions';
import { getActiveSitterById } from 'src/app/root-state/sitter/sitter.selectors';
import { Store, select } from '@ngrx/store';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-book-sitter',
  templateUrl: './book-sitter.component.html',
  styleUrls: ['./book-sitter.component.scss'],
})
export class BookSitterComponent implements OnInit {
  @Input() sitter: any;
  sitterInfo: any;
  userName: any;
  userId: any;

  constructor(private store: Store) {
    setTimeout(() => {
      this.store
        .pipe(select(getActiveSitterById(this.sitter)))
        .subscribe((activeSitter) => (this.sitterInfo = activeSitter));
    }, 1500);
    setTimeout(() => {
      this.store
        .pipe(select(getActiveName))
        .subscribe((info) => (this.userName = info));
    }, 1500);
  }

  onBook() {
    this.store.dispatch(
      addBook({
        contactInfo: 'test',
        userId: this.sitterInfo.userId,
        name: this.userName,
        isBooked: false,
        isComplete: false,
        whoBookedId: this.userId,
        sitterName: this.sitterInfo.userName,
      })
    );
    console.log(this.userName);
    console.log(this.sitterInfo);
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
  }
}
