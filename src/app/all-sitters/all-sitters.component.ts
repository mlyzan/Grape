import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitter, Comment } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { loadSitters, addComment, loadComments, getSitterCommentsId, updateSitterRate } from '../root-state/sitter/sitter.actions';
import { getAllSitters, getError, getCommentsById, getCurrentSitterCommentsId } from '../root-state/sitter/sitter.selectors';
import { getActiveName, getActiveId } from '../root-state/user/user.selectors';

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
  constructor(private sitterService: SitterService, private store: Store) { 
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

    this.sitters$ = this.store.select(getAllSitters);
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
}
