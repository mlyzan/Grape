import {Component, OnInit, OnDestroy} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Store, ActionsSubject, select} from '@ngrx/store';

import {UserService} from '../../root-state/user/user.service';
import {loadSitters, loadComments, loadBooks} from '../../root-state/sitter/sitter.actions';
import {loginUser, loginUserSuccess} from '../../root-state/user/user.actions';
import {ofType} from '@ngrx/effects';

import {Subscription} from 'rxjs';
import {getActiveId} from 'src/app/root-state/user/user.selectors';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {
  private subsctiptions: Subscription[] = [];
  subscSuccess = new Subscription();
  hide = true;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  model = {
    email: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router, private store: Store, private actionsSubj: ActionsSubject,
              private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Login')
    document.body.classList.add('login-bg');
  }

  ngOnDestroy() {
    this.subsctiptions.forEach(sub => sub.unsubscribe());
    this.subscSuccess.unsubscribe();
    document.body.classList.remove('login-bg');
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(loadSitters());
    this.store.dispatch(loadComments());
    this.store.dispatch(loadBooks());
    this.store.dispatch(loginUser(form.value));

    this.subsctiptions.push(this.store.pipe(select(getActiveId)).subscribe(id => {
      localStorage.setItem('userId', id);
    }));

    this.subscSuccess = this.actionsSubj.pipe(
      ofType(loginUserSuccess)
    ).subscribe(
      (res: any) => {
        const isSitter = !!res.userInfo.isSitter;
        setTimeout(() => {
          this.router.navigateByUrl(isSitter ? '/sitter' : '/all-sitters');
        }, 1500);
      },
    );
  }
}
