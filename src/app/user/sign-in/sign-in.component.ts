import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from '../user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

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

  onSubmit(form: NgForm) {
    this.userService.loginUser(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => {
          this.showSuccessMessage = false;
          this.router.navigateByUrl('/sitter');
        }, 1500);
      }, 
      err => {
        this.serverErrorMessage = err.error.message;
        this.serverMessage = true;
        setTimeout(() => {
          this.serverMessage = false;
        }, 1500)
      })
  }

}
