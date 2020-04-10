import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoading } from '../root-state/sitter/sitter.selectors';
import { Observable } from 'rxjs';
@Component({
  selector: 'grape-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  spinner$: Observable<boolean>;
  constructor(private store: Store) { }
  ngOnInit() {
    this.spinner$ = this.store.select(getLoading);
  }
}
