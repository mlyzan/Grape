import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store, select} from '@ngrx/store';
import {Router} from '@angular/router';
import {updateSitter, loadSitters} from 'src/app/root-state/sitter/sitter.actions';
import {getActiveId} from 'src/app/root-state/user/user.selectors';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Sitter} from 'src/app/root-state/sitter/sitter.interfaces';
import {getActiveSitterById, getSuccess} from 'src/app/root-state/sitter/sitter.selectors';
import {CITIES} from '../../cities';
import {Subscription} from 'rxjs';
import {Title} from '@angular/platform-browser';

//import { MinutesFormatterPipe } from 'ngx-material-timepicker/src/app/material-timepicker/pipes/minutes-formatter.pipe';

@Component({
  selector: 'app-sitter-edit',
  templateUrl: './sitter-edit.component.html',
  styleUrls: ['./sitter-edit.component.scss']
})
export class SitterEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  cities: string[];
  search = '';
  activeId: string;
  sitter$: Sitter;
  showSuccessMessage: boolean = false;
  successMessage: object;

  sitterEditInfo = new FormGroup({
    services: new FormControl('', Validators.required),
    animals: new FormControl('', Validators.required),
    availabilityFrom: new FormControl('', Validators.required),
    availabilityTo: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
    information: new FormControl('', Validators.required),
  });

  constructor(private store: Store, private router: Router, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Edit profile');
    this.cities = CITIES;
    this.subscriptions.push(this.store.pipe(
      select(getActiveId)
    ).subscribe(id => this.activeId = id));
    this.subscriptions.push(this.store.pipe(
      select(getActiveSitterById(this.activeId))
    ).subscribe(activeSitter => this.sitter$ = activeSitter));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onUpdate() {
    console.log(this.sitterEditInfo.value);
    this.store.dispatch(updateSitter(this.activeId, {...this.sitterEditInfo.value}));
    this.subscriptions.push(this.store.pipe(
      select(getSuccess)
    ).subscribe(success => this.successMessage = success));
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
      this.store.dispatch(loadSitters());
      this.router.navigateByUrl('sitter');
    }, 1500);
  }

  onCancel() {
    this.router.navigateByUrl('sitter');
  }
}
