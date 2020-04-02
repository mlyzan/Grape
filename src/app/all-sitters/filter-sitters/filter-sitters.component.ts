import { filterSittersByAddress, filterSittersByAnimals, filterSittersByServices } from './../../root-state/sitter/sitter.actions';
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

  width = 10;

  open() {
    this.width = 100;
  }

  close() {
    this.sidenav.close();
    this.width = 10;
  }

  filters = new FormGroup({
    services: new FormControl('', Validators.required),
    animals: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required)
  })

  constructor(private store: Store) { }

  find() {
    if (this.filters.value.services) {
      this.store.dispatch(filterSittersByServices({
        services: this.filters.value.services
      }))
    }
    if (this.filters.value.animals) {
      this.store.dispatch(filterSittersByAnimals({
        animals: this.filters.value.animals
      }))
    }
    if (this.filters.value.address) {
      this.store.dispatch(filterSittersByAddress({
        address: this.filters.value.address
      }))
    }
  }

  ngOnInit(): void {
  }

}
