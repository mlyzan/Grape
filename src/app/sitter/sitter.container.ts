import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {Sitter} from './../root-state/sitter/sitter.interfaces';

@Component({
  selector: 'grape-container-sitter',
  templateUrl: './sitter.container.html',
  styleUrls: ['./sitter.component.scss']
})

export class SitterContainerComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

}
