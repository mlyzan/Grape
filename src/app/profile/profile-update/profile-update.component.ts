import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { updateProfile } from 'src/app/root-state/user/user.actions';
import { getActiveId, getUserInfo } from 'src/app/root-state/user/user.selectors';
import { ImageSnippet } from './../../sitter-registration/sitter-registration.component';
import {CITIES} from '../../cities';
import {UserInterfaces} from '../../root-state/user/user.interfaces';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {
  citiesCopy: string[];
  selectedFile: ImageSnippet;
  userId: string;
  user: UserInterfaces;
  profileUpdate = new FormGroup({
    animals: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
    photo: new FormControl('', Validators.required)
  });

  constructor(private _router: Router, private _store: Store) { }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file)
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this._store.pipe(
      select(getActiveId)
    ).subscribe(res => this.userId = res);
    this.citiesCopy = CITIES;
    this._store.pipe(
      select(getUserInfo)
    ).subscribe(res => this.user = res);
  }

  onCancel(): void {
    this._router.navigateByUrl('profile')
  }

  onUpdate(): void {
    this._store.dispatch(updateProfile({
      ...this.profileUpdate.value,
      photo: this.selectedFile.src
    }, this.userId));
    setTimeout(() => {
      this._router.navigateByUrl('profile')
    }, 2000)
  }

  filterCities(event): void {
    this.citiesCopy = CITIES.filter(e => e.toLowerCase().indexOf(event.target.value.toLowerCase()) >= 0);
  }
}
