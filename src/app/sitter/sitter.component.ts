import { Component, OnInit } from '@angular/core';
import { Sitter, Comment, Book} from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { getActiveSitterById, getSitters, getCommentsById, 
        getBookById, getCompleteBooksById } from '../root-state/sitter/sitter.selectors';
import { getActiveId } from '../root-state/user/user.selectors';
import { Router } from '@angular/router';
import { deleteSitterSuccess, deleteSitter, loadSitters, loadComments, 
        updateBookStatus, declineBook, loadBooks } from '../root-state/sitter/sitter.actions';
import { UserService } from '../root-state/user/user.service';
import { userLoaded } from '../root-state/user/user.actions';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'grape-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  sitter$: Sitter; 
  activeId: string; isEmpty; isExist;
  comments: Comment[];
  book: object;
  books: Book[];
  isInProcess: boolean;
  panelOpenState = false;
  isCompleteClick = false;

  constructor(
    private sitterService: SitterService, 
    private store: Store, 
    private router: Router,
    private userService: UserService,
    public dialog: MatDialog) { 
    
    this.store.pipe(
      select(getSitters)
    ).subscribe(sitters => this.isEmpty = sitters );

    this.store.pipe(
      select(getActiveId)
    ).subscribe(id => this.activeId = id);

    this.isExist = this.isEmpty.find(sitter => sitter.userId === this.activeId);

    if(!!this.isEmpty && this.isEmpty.length > 0 && !!this.isExist) {

      this.store.pipe(
        select(getActiveSitterById(this.activeId))
      ).subscribe(activeSitter => this.sitter$ = activeSitter);
    }

    this.store.pipe(
      select(getCommentsById(this.activeId))
    ).subscribe(comments => this.comments = comments);

    this.store.pipe(
      select(getBookById(this.activeId))
    ).subscribe(book => this.book = book);

    this.store.pipe(
      select(getCompleteBooksById(this.activeId))
    ).subscribe(books => this.books = books);

   }

  ngOnInit(): void {
    this.store.dispatch(loadComments());
    this.store.dispatch(loadBooks());
  }

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '450px',
      height: '350px',
      data: "Do you really want to delete your profile?"
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.onDelete(this.activeId);
      }
    });
  }

  onDelete(id: string) {
    this.store.dispatch(deleteSitter(id));
    setTimeout(() => {
      this.store.dispatch(loadSitters());
      this.store.pipe(select(getSitters)).subscribe(sitters => this.isEmpty = sitters);
      this.userService.getUser(id).subscribe((user) => {
        this.store.dispatch(userLoaded(user));
      })
      this.router.navigateByUrl('all-sitters');
    }, 1000);
  }

  switchToEdit() {
    this.router.navigateByUrl('sitter-edit');
  }

  onConfirm(id: string) {
    this.store.dispatch(updateBookStatus(id, {isBooked: true, isComplete: false}));
    this.isInProcess = true;
  }

  onComplete(id: string) {
    this.store.dispatch(updateBookStatus(id, {isBooked: false, isComplete: true}));
    this.isInProcess = false;
    this.isCompleteClick = true;
    setTimeout(() => {
      this.isCompleteClick = false;
      this.store.dispatch(loadBooks());
      this.store.pipe(
        select(getBookById(this.activeId))
      ).subscribe(book => this.book = book);
    }, 1000)
  }

  onDecline(id: string) {
    this.store.dispatch(declineBook(id));
    setTimeout(() => {
      this.store.dispatch(loadBooks());
      this.store.pipe(
        select(getBookById(this.activeId))
      ).subscribe(book => this.book = book);
    }, 1000)
  }

  loadBooks() {
    this.store.dispatch(loadBooks());
  }
  
}
