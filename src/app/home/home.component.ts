import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
    let element = document.querySelector('.header');
    let element2 = document.querySelector('.nav');
    if (window.pageYOffset > element2.clientHeight + 250) {
      element.classList.add('faded');
    } else {
      element.classList.remove('faded');
    }
  }

}
