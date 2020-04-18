import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store, select } from '@ngrx/store';
import { createSitter } from './../root-state/sitter/sitter.actions';
import { Router } from '@angular/router';
import { getUserInfo } from '../root-state/user/user.selectors';
import { userBecomeSitter } from '../root-state/user/user.actions';
import { CITIES } from '../cities';

export class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-sitter-registration',
  templateUrl: './sitter-registration.component.html',
  styleUrls: ['./sitter-registration.component.scss']
})
export class SitterRegistrationComponent implements OnInit, OnDestroy {
  cities: string[];
  search = '';
  sitterPersonalInfo = new FormGroup({
    services: new FormControl('', Validators.required),
    animals: new FormControl('', Validators.required),
    availabilityFrom: new FormControl('', Validators.required),
    availabilityTo: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
    information: new FormControl('', Validators.required),
  });
  min:string;
  max:string;
  selectedFile:ImageSnippet;

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file)
    });

    reader.readAsDataURL(file);
  }

  userInfo;
  constructor(private sitterService: SitterService, private store: Store, private router: Router) {
    this.store.pipe(
      select(getUserInfo)
    ).subscribe(userInfo => this.userInfo = userInfo);
   }

  ngOnInit(): void {
    this.cities = CITIES;
    document.body.classList.add('sitter-registration-bg');    
  }
  ngOnDestroy() {
    document.body.classList.remove('sitter-registration-bg');    
  }
  onSubmit() {
    this.store.dispatch(createSitter({
      ...this.sitterPersonalInfo.value,
      photo: this.selectedFile.src,
      userId: this.userInfo.userId,
      userName: this.userInfo.userName,
      userEmail: this.userInfo.userEmail
    }));
    this.store.dispatch(userBecomeSitter());
    setTimeout(() => {
      this.router.navigateByUrl('/all-sitters');
    }, 3000);
  }
}
