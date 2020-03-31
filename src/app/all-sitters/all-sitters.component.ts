import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Sitter } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store } from '@ngrx/store';
import { loadSitters } from '../root-state/sitter/sitter.actions';
import { getSitters, getLoading, getError } from '../root-state/sitter/sitter.selectors';


@Component({
  selector: 'grape-all-sitters',
  templateUrl: './all-sitters.component.html',
  styleUrls: ['./all-sitters.component.scss']
})
export class AllSittersComponent implements OnInit {
  sitters$: Observable<Sitter[]>;
  loading$: Observable<boolean>;
  error$: Observable<Error>;
  constructor(private sitterService: SitterService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadSitters());
    this.sitters$ = this.store.select(getSitters);
    this.loading$ = this.store.select(getLoading);
    this.error$ = this.store.select(getError);
  }


}
