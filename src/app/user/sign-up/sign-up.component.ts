import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, NgForm} from '@angular/forms';

import { UserService } from '../user.service';

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

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.userService.registerUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      }, 
      err => {
        if(err.status === 422) {
          this.serverErrorMessage = err.error.join('<br/>');
        } else {
          this.serverErrorMessage = 'Something went wrong...'
        }
      });
  }
}
