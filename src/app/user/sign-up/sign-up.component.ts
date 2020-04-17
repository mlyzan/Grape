import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { UserService } from '../../root-state/user/user.service';
import { createUser } from '../../root-state/user/user.actions'; 

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  hide = true;
  
  constructor(public userService: UserService, private router: Router, private store: Store) { }

  ngOnInit(): void {
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