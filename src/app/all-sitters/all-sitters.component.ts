import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitter, Comment } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { loadSitters, addComment, loadComments, getSitterCommentsId } from '../root-state/sitter/sitter.actions';
import { getSitters, getLoading, getError, getCommentsById, getCurrentSitterCommentsId } from '../root-state/sitter/sitter.selectors';
import { getActiveName, getActiveId } from '../root-state/user/user.selectors';


@Component({
  selector: 'grape-all-sitters',
  templateUrl: './all-sitters.component.html',
  styleUrls: ['./all-sitters.component.scss']
})
export class AllSittersComponent implements OnInit {
  sitters$: Observable<Sitter[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  sittersArray: Sitter[];
  isShowComments: boolean = false;
  activeName: string;
  comments: Comment[];
  currentSitterCommentId: string;
  activeId: string;
  constructor(private sitterService: SitterService, private store: Store) { 
    this.store.pipe(
      select(getSitters)
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
    this.sitters$ = this.store.select(getSitters);
    this.loading$ = this.store.select(getLoading);
    this.error$ = this.store.select(getError);
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
    this.store.dispatch(loadComments());
    this.store.pipe(
      select(getCommentsById(id))
    ).subscribe(comments => this.comments = comments);

  }


}
