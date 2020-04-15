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
    let header = document.querySelector('.header');
    let nav = document.querySelector('.nav');
    let body = document.querySelector('body');
    if (window.pageYOffset > nav.clientHeight + 250) {
      header.classList.add('faded');
      body.classList.add('teal');
    } else {
      header.classList.remove('faded');
      body.classList.remove('teal');
    }

    let text = document.querySelectorAll('.parallax__text');
    let main = document.querySelector('.main').clientHeight + 200;
    let item = document.querySelectorAll('.parallax__item');
      for (let i=0; i<item.length; i++) {
        if (window.pageYOffset > main + item[i].clientHeight) {
          text[i].classList.remove('slide');
        } else {
          text[i].classList.add('slide');
        }
      }    
  }
}
