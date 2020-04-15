import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'grape-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})




export class HeaderComponent implements OnInit, DoCheck {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) onWindowScroll(e) { }

  ngDoCheck(): void {
    let element = document.querySelector('.nav');
    if (this.router.routerState.snapshot.url === '/') {
      element.classList.add('nav-transparent');
      if (window.pageYOffset > element.clientHeight + 250) {
        element.classList.remove('nav-transparent');
      } 
    } else {
      element.classList.remove('nav-transparent');
    }
  }
 
  
 
}
