import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })

// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(
//     next: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
//   ): Observable<boolean> | Promise<boolean> | boolean {
//     let url: string = state.url;
//     return this.checkLogin(url);
//   }

//   checkLogin(url: string): boolean {
//     console.log(this.authService.isLoggenIn)
//     if (this.authService.isLoggenIn) {return true};
//     // this.authService.redirectUrl = url;
//     this.router.navigate(['login']);
//     return false;
//   }
// }

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}