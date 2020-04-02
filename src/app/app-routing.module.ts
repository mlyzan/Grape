import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SitterContainerComponent } from './sitter/sitter.container';
import { SitterComponent } from './sitter/sitter.component';
import { SitterRegistrationComponent } from './sitter-registration/sitter-registration.component';
import { AllSittersComponent } from './all-sitters/all-sitters.component';
import { AuthGuard } from './app.service';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'signup', component: UserComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }]
  },
  {
    path: 'sitter', component: SitterContainerComponent,
    canActivate: [AuthGuard],
    children: [{path: '', component: SitterComponent}]
  },
  {
    path: 'create-sitter', component: SitterRegistrationComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'all-sitters', component: AllSittersComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
