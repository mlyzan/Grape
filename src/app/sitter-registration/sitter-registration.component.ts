import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SitterService } from '../root-state/sitter/sitter.service';
import { Store } from '@ngrx/store';
import { createSitter } from './../root-state/sitter/sitter.actions';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-sitter-registration',
  templateUrl: './sitter-registration.component.html',
  styleUrls: ['./sitter-registration.component.scss']
})
export class SitterRegistrationComponent implements OnInit {
  sitterPersonalInfo = new FormGroup({
    services: new FormControl('', Validators.required),
    animals: new FormControl('', Validators.required),
    availability: new FormControl('', Validators.required),
    payment: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    years: new FormControl('', Validators.required),
    information: new FormControl('', Validators.required),
  });

  selectedFile:ImageSnippet;

  processFile(imageInput: any) {    
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file)
    });

    reader.readAsDataURL(file); 
  }
  constructor(private sitterService: SitterService, private store: Store) { }

  ngOnInit(): void {
  }
  onSubmit() {
    this.store.dispatch(createSitter({...this.sitterPersonalInfo.value, photo: this.selectedFile.src}))
  }
}
