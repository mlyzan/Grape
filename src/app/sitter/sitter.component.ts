import { Component, OnInit, Input } from '@angular/core';
import { Sitter } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { getActiveSitterById, getSitters } from '../root-state/sitter/sitter.selectors';
import { getActiveId } from '../root-state/user/user.selectors';

@Component({
  selector: 'grape-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit {
  sitter$: Sitter; activeId: string; isEmpty; isExist;
  constructor(private sitterService: SitterService, private store: Store) { 
    
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

    
   }

  ngOnInit(): void {
    console.log(this.sitter$);
    console.log(this.isEmpty);
    console.log(this.isExist);
  }
  
}
