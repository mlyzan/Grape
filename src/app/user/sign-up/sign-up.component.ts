import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';

import {UserService} from '../../root-state/user/user.service';
import {createUser} from '../../root-state/user/user.actions';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;

  constructor(public userService: UserService, private router: Router, private store: Store, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Sign-up')
    document.body.classList.add('signup-bg');
  }

  ngOnDestroy() {
    document.body.classList.remove('signup-bg');
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(createUser(form.value));
    setTimeout(() => {
      form.resetForm();
      this.router.navigateByUrl('/all-sitters');
    }, 2000);
  }
}
