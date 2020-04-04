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
  showSuccessMessage: boolean;
  serverErrorMessage: string;

  constructor(public userService: UserService, private router: Router, private store: Store) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.store.dispatch(createUser(form.value));
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          form.resetForm();
          this.router.navigateByUrl('/login');
        }, 2000);
  }
}
