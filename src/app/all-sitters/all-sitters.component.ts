import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitter, Comment } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { loadSitters, addComment, loadComments, getSitterCommentsId,
        updateSitterRate, addBook, loadBooks } from '../root-state/sitter/sitter.actions';
import { getAllSitters, getError, getCommentsById, getCurrentSitterCommentsId,
        getBookById, getSuccess } from '../root-state/sitter/sitter.selectors';
import { getActiveName, getActiveId, getUserInfo } from '../root-state/user/user.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'grape-all-sitters',
  templateUrl: './all-sitters.component.html',
  styleUrls: ['./all-sitters.component.scss']
})
export class AllSittersComponent implements OnInit {
  sitters$: Observable<Sitter[]>;
  error$: Observable<Error>;
  sittersArray;
  isShowComments: boolean = false;
  activeName: string;
  comments: Comment[];
  currentSitterCommentId: string;
  activeId: string;
  isBooked: boolean; bookId: string;
  panelOpenState = false;
  isSitter: boolean;
  constructor(private sitterService: SitterService, private store: Store, private router: Router) {
    this.store.pipe(
      select(getAllSitters)
    ).subscribe(sitters => this.sittersArray = sitters );

    this.store.pipe(
      select(getActiveName)
    ).subscribe(name => this.activeName = name );

    this.store.pipe(
      select(getActiveId)
    ).subscribe(id => this.activeId = id);
  }

  ngOnInit(): void {
    this.store.dispatch(loadSitters());
    this.store.dispatch(loadComments());
    this.store.dispatch(loadBooks());

    this.sitters$ = this.store.select(getAllSitters);
    this.error$ = this.store.select(getError);

    this.store.pipe(
      select(getUserInfo)
    ).subscribe(userInfo => this.isSitter = userInfo.isSitter);
  }

  onShow(userId: string) {
    this.store.dispatch(getSitterCommentsId(userId));
    this.store.pipe(
      select(getCommentsById(userId))
    ).subscribe(comments => this.comments = comments);
    this.store.pipe(
      select(getCurrentSitterCommentsId)
    ).subscribe(id => this.currentSitterCommentId = id);
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
      this.store.pipe(
        select(getCommentsById(id))
      ).subscribe(comments => this.comments = comments);
    },1500)

  }

  onRatingSet(id: string, rate: number) {
    if(this.activeId && this.activeId !== id) {
      this.store.dispatch(updateSitterRate(id, rate))
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
    this.panelOpenState = false
    setTimeout(() => {
      this.store.dispatch(loadBooks());
      this.router.navigateByUrl('profile');
    },1000)
  }

  getBookStatus(id: string) {
    this.store.pipe(
      select(getBookById(id))
    ).subscribe(book => {
      if(book === undefined) {
        this.isBooked = false;
      } else {
        this.isBooked = book.isBooked;
        this.bookId = book.userId;
      }

    });
  }

  isSitterBooked(id: string): boolean {
    let isBook: boolean;
    this.store.pipe(
      select(getBookById(id))
    ).subscribe(res => {
      if (res) {
        isBook = res.isBooked;
      }
    });
    return isBook;
  }
}
