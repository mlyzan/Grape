import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitter } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { loadSitters } from '../root-state/sitter/sitter.actions';
import { getAllSitters, getLoading, getError } from '../root-state/sitter/sitter.selectors';


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
  constructor(private sitterService: SitterService, private store: Store) { 
    this.store.pipe(
      select(getAllSitters)
    ).subscribe(sitters => this.sittersArray = sitters );
  }

  ngOnInit(): void {
    this.store.dispatch(loadSitters());
    this.sitters$ = this.store.select(getAllSitters);
    this.loading$ = this.store.select(getLoading);
    this.error$ = this.store.select(getError);
  }


}
