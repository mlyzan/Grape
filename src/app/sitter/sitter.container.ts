import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sitter, getSitter } from '../root-state/sitter';

@Component({
  selector: 'grape-container-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SitterContainerComponent implements OnInit {
  sitter$: Observable<Sitter>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sitter$ = this.store.select(getSitter);
  }
}
