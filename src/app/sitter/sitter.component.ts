import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sitter } from '../root-state/sitter/sitter.interfaces';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select, ActionsSubject } from '@ngrx/store';
import { getActiveSitterById, getSitters } from '../root-state/sitter/sitter.selectors';
import { getActiveId } from '../root-state/user/user.selectors';
import { Router } from '@angular/router';
import { deleteSitterSuccess, deleteSitter, loadSitters } from '../root-state/sitter/sitter.actions';
import { Subscription } from 'rxjs';
import { ofType } from '@ngrx/effects';

@Component({
  selector: 'grape-sitter',
  templateUrl: './sitter.component.html',
  styleUrls: ['./sitter.component.scss']
})
export class SitterComponent implements OnInit, OnDestroy {
  sitter$: Sitter; 
  activeId: string; isEmpty; isExist;
  subscSuccess = new Subscription();
  showSuccessMessage: boolean;
  successMessage: object;
  constructor(
    private sitterService: SitterService, 
    private store: Store, 
    private router: Router, 
    private actionsSubj: ActionsSubject) { 
    
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
  }

  ngOnDestroy() {
    this.subscSuccess.unsubscribe();
  }

  onDelete(id: string) {
    this.store.dispatch(deleteSitter(id));

    this.subscSuccess = this.actionsSubj.pipe(
      ofType(deleteSitterSuccess)
    ).subscribe(
      res => {
        this.successMessage = res.success['success'];
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.store.dispatch(loadSitters());
          this.store.pipe(select(getSitters)).subscribe(sitters => this.isEmpty = sitters);
        }, 2000);
      },
    )

  }

  switchToEdit() {
    this.router.navigateByUrl('sitter-edit');
  }
  
}
