import { Component, OnInit, Input } from '@angular/core';
import { Sitter } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store } from '@ngrx/store';
import { loadSitters } from './../root-state/sitter/sitter.actions';
import { Observable } from 'rxjs';
import { getSitters } from '../root-state/sitter/sitter.selectors';

@Component({
  selector: 'grape-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  sitters$: Observable<Sitter[]>;
  constructor(private sitterService: SitterService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadSitters());
    this.sitters$ = this.store.select(getSitters);
    //this.refreshSittersList();
  }

  // refreshSittersList() {
  //   this.sitterService.getSitters().subscribe(res => {
  //     this.sitters = res as Sitter[];
  //   })

  // }
  
}
