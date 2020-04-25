import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.scss']
})
export class NotFoundPageComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    document.body.classList.add('error-page');
  }

  ngOnDestroy() {
    document.body.classList.remove('error-page');
  }
}
