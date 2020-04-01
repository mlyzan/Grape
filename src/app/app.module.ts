import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { SitterContainerComponent } from './sitter/sitter.container';
import { SitterComponent } from './sitter/sitter.component';
import { SitterRegistrationComponent } from './sitter-registration/sitter-registration.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HeaderComponent } from './header/header.component';
import { AllSittersComponent } from './all-sitters/all-sitters.component';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import  {MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatListModule} from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';

import { UserService } from './user/user.service';
import { SitterService } from './root-state/sitter/sitter.service';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { sitterReducer } from './root-state/sitter/sitter.reducer';
import { SitterEffects } from './root-state/sitter/sitter.effects';
import { SITTER_KEY } from './root-state/sitter/sitter.selectors';  
import { USER_KEY } from './root-state/user/user.selectors';
import { userReducer } from './root-state/user/user.reducer';
import { UserEffects } from './root-state/user/user.effects';
import { FilterSittersComponent } from './all-sitters/filter-sitters/filter-sitters.component';

const MaterialComponents = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatDividerModule,
  MatExpansionModule,
  MatBadgeModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule
];

@NgModule({
  declarations: [
    AppComponent,
    SitterContainerComponent,
    SitterComponent,
    SitterRegistrationComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HeaderComponent,
    AllSittersComponent,
    FilterSittersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialComponents,
    HttpClientModule,
    StoreModule.forRoot({ 
      [SITTER_KEY]: sitterReducer,
      [USER_KEY]: userReducer
    }),
    EffectsModule.forRoot([SitterEffects, UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
    })
  ],
  providers: [UserService, SitterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
