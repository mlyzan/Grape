import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {Sitter, Comment} from '../root-state/sitter/sitter.interfaces';
import {SitterService} from '../root-state/sitter/sitter.service';
import {Store, select} from '@ngrx/store';
import {
  loadSitters, addComment, loadComments, getSitterCommentsId,
  updateSitterRate, addBook, loadBooks
} from '../root-state/sitter/sitter.actions';
import {
  getAllSitters, getError, getCommentsById, getCurrentSitterCommentsId,
  getBookById, getSuccess
} from '../root-state/sitter/sitter.selectors';
import {getActiveName, getActiveId, getUserInfo} from '../root-state/user/user.selectors';
import {Router} from '@angular/router';

@Component({
  selector: 'grape-all-sitters',
  templateUrl: './all-sitters.component.html',
  styleUrls: ['./all-sitters.component.scss']
})
export class AllSittersComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  sitters$: Observable<Sitter[]>;
  error$: Observable<Error>;
  isShowComments: boolean = false;
  activeName: string;
  comments: Comment[];
  currentSitterCommentId: string;
  activeId: string;
  isBooked: boolean;
  bookId: string;
  panelOpenState = false;
  isSitter: boolean;

  constructor(private sitterService: SitterService, private store: Store, private router: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(loadSitters());
    this.store.dispatch(loadComments());
    this.store.dispatch(loadBooks());

    this.sitters$ = this.store.select(getAllSitters);
    this.error$ = this.store.select(getError);

    this.subscriptions.push(this.store.pipe(
      select(getUserInfo)
    ).subscribe(userInfo => this.isSitter = userInfo.isSitter));

    this.subscriptions.push(this.store.pipe(
      select(getActiveName)
    ).subscribe(name => this.activeName = name));

    this.subscriptions.push(this.store.pipe(
      select(getActiveId)
    ).subscribe(id => this.activeId = id));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onShow(userId: string) {
    this.store.dispatch(getSitterCommentsId(userId));
    this.subscriptions.push(this.store.pipe(
      select(getCommentsById(userId))
    ).subscribe(comments => this.comments = [...comments].reverse()));
    this.subscriptions.push(this.store.pipe(
      select(getCurrentSitterCommentsId)
    ).subscribe(id => this.currentSitterCommentId = id));
    this.isShowComments = !this.isShowComments;
  }

  onSubmit(comment: string, id: string) {
    this.store.dispatch(addComment({
      comment: comment,
      userId: id,
      name: this.activeName
    }));
    setTimeout(() => {
      this.store.dispatch(loadComments());
      this.subscriptions.push(this.store.pipe(
        select(getCommentsById(id))
      ).subscribe(comments => this.comments = [...comments].reverse()));
    }, 1500);

  }

  onRatingSet(id: string, rate: number) {
    if (this.activeId && this.activeId !== id) {
      this.store.dispatch(updateSitterRate(id, rate));
    }
  }

  onBook(contactInfo: string, id: string, sitterName: string) {
    this.store.dispatch(addBook({
      contactInfo: contactInfo,
      userId: id,
      name: this.activeName,
      isBooked: false,
      isComplete: false,
      whoBookedId: this.activeId,
      sitterName
    }));
    this.panelOpenState = false;
    setTimeout(() => {
      this.store.dispatch(loadBooks());
      this.router.navigateByUrl('profile');
    }, 1000);
  }

  getBookStatus(id: string) {
    this.subscriptions.push(this.store.pipe(
      select(getBookById(id))
    ).subscribe(book => {
      if (book === undefined) {
        this.isBooked = false;
      } else {
        this.isBooked = book.isBooked;
        this.bookId = book.userId;
      }
    }));
  }

  isSitterBooked(id: string): boolean {
    let isBook: boolean;
    this.subscriptions.push(this.store.pipe(
      select(getBookById(id))
    ).subscribe(res => {
      if (res) {
        isBook = res.isBooked;
      }
    }));
    return isBook;
  }
}
