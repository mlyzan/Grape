import { Component, OnInit, HostListener, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
// import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
// import { Observable } from 'rxjs';

@Component({
  selector: 'grape-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, DoCheck {
  // isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  constructor(private router: Router, 
    // private breakpointObserver: BreakpointObserver
    ) { }

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