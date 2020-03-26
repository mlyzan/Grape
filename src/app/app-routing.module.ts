import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SitterContainerComponent } from './sitter/sitter.container';
import { SitterComponent } from './sitter/sitter.component';

const routes: Routes = [
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
    children: [{path: '', component: SitterComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
