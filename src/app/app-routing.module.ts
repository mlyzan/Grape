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
import { SitterEditComponent } from './sitter/sitter-edit/sitter-edit.component';
import { BoardComponent } from './board/board.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';

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
  },  
  {
    path: 'sitter-edit', component: SitterEditComponent
  },
  {
    path: 'board', component: BoardComponent
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard]  
  },
  {
    path: 'profile-update', component: ProfileUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found', component: NotFoundPageComponent
  },
  {
    path: '**', redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
