import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Store, select} from '@ngrx/store';
import {updateProfile} from 'src/app/root-state/user/user.actions';
import {getActiveId, getUserInfo} from 'src/app/root-state/user/user.selectors';
import {ImageSnippet} from './../../sitter-registration/sitter-registration.component';
import {CITIES} from '../../cities';
import {UpdateInfo, UserInterfaces} from '../../root-state/user/user.interfaces';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  cities: string[] = [];
  selectedFile: ImageSnippet;
  userId: string;
  user: UserInterfaces = {
    userId: '',
    userName: '',
    userEmail: '',
    updateInfo: {
      animals: [],
      years: '',
      address: '',
      photo: ''
    }
  };
  search = this.user.updateInfo.address;
  profileUpdate = new FormGroup({
    animals: new FormControl(this.user.updateInfo.animals, Validators.required),
    address: new FormControl(this.user.updateInfo.address, Validators.required),
    years: new FormControl(this.user.updateInfo.years, Validators.required),
    photo: new FormControl(this.user.updateInfo.photo, Validators.required)
  });

  constructor(private _router: Router, private _store: Store) {
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    });

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.subscriptions.push(this._store.pipe(
      select(getActiveId)
    ).subscribe(res => this.userId = res));
    this.cities = CITIES;
    this.subscriptions.push(this._store.pipe(
      select(getUserInfo)
    ).subscribe(res => {
      this.user = res;
      this.search = res.updateInfo.address;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onCancel(): void {
    this._router.navigateByUrl('profile');
  }

  onUpdate(): void {
    this._store.dispatch(updateProfile({
      ...this.profileUpdate.value,
      photo: this.selectedFile ? this.selectedFile.src : this.user.updateInfo.photo
    }, this.userId));
    setTimeout(() => {
      this._router.navigateByUrl('profile');
    }, 2000);
  }
}
