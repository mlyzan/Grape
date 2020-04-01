import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, State } from '@ngrx/store';
import { MatSidenav } from '@angular/material/sidenav';



@Component({
  selector: 'grape-filter-sitters',
  templateUrl: './filter-sitters.component.html',
  styleUrls: ['./filter-sitters.component.scss']
})
export class FilterSittersComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;

  close() {
    this.sidenav.close();
  }

  filters = new FormGroup({
    services: new FormControl('', Validators.required),
    animals: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })

  constructor(private store: Store) { }

  find() {
    let a = State;
    console.log(a);
  }

  ngOnInit(): void {
  }

}
