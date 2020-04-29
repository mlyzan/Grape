import { Component, OnInit, OnDestroy } from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit, OnDestroy {

  constructor(private title: Title) { }

  ngOnInit(): void {
    this.title.setTitle('Not found');
    document.body.classList.add('error-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('error-page');
  }
}
