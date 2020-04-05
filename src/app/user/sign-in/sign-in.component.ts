import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, ActionsSubject, select } from '@ngrx/store';

import { UserService } from '../../root-state/user/user.service';
import { loadSitters, loadComments } from '../../root-state/sitter/sitter.actions';
import { loginUser, loginUserFail, loginUserSuccess } from '../../root-state/user/user.actions';
import { ofType } from '@ngrx/effects';

import { Subscription } from 'rxjs';
import { getActiveId } from 'src/app/root-state/user/user.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  subscFail = new Subscription();
  subscSuccess = new Subscription();

  constructor(private userService: UserService, private router: Router, private store: Store, private actionsSubj: ActionsSubject) {}

  showSuccessMessage: boolean;
  serverErrorMessage: string;
  serverMessage: boolean;
  hide = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  model = {
    email: '',
    password: ''
  };

  ngOnInit(): void {
    
  }

  ngOnDestroy() {
    this.subscFail.unsubscribe();
    this.subscSuccess.unsubscribe();
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(loadSitters());
    this.store.dispatch(loadComments());
    this.store.dispatch(loginUser(form.value));
    
    this.store.pipe(select(getActiveId)).subscribe(id => {
      localStorage.setItem('userId', id);
    });

    this.subscFail = this.actionsSubj.pipe(
      ofType(loginUserFail)
    ).subscribe(
      err => {
        this.serverErrorMessage = err.error['error'].message;
        console.log(err.error['error'].message);
        this.serverMessage = true;
        setTimeout(() => {
          this.serverMessage = false;
        }, 1500)
      }
    );

    this.subscSuccess = this.actionsSubj.pipe(
      ofType(loginUserSuccess)
    ).subscribe(
      (res: any) => {
        const isSitter = !!res.userInfo.isSitter;
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl(isSitter? '/sitter': '/all-sitters');
        }, 1500);
      },
    )
  }
}
