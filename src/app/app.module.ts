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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NgxStarsModule } from 'ngx-stars';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { UserService } from './root-state/user/user.service';
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

import { ORDER_KEY } from './root-state/board/board.selectors';
import { boardReducer } from './root-state/board/board.reducer';
import { BoardEffects } from './root-state/board/board.effects';
import { BoardService } from './root-state/board/board.service';

import { AuthGuard } from './app.service';
import { AuthService } from './auth.service';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DevelopersComponent } from './developers/developers.component';
import { SitterEditComponent } from './sitter/sitter-edit/sitter-edit.component';
import { SpinnerComponent } from './spinner/spinner.component';

import { BoardComponent } from './board/board.component';
import { CreateOrderComponent } from './board/create-order/create-order.component';
import { OrderComponent } from './board/order/order.component';

import { NotificationSnackBarComponent } from './notification-snack-bar/notification-snack-bar.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileUpdateComponent } from './profile/profile-update/profile-update.component';



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
  MatListModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSnackBarModule
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
    HomeComponent,
    FilterSittersComponent,
    NavigationComponent,
    DevelopersComponent,
    SitterEditComponent,
    SpinnerComponent,
    BoardComponent,
    CreateOrderComponent,
    OrderComponent,
    NotificationSnackBarComponent,
    ProfileComponent,
    ProfileUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialComponents,
    NgxStarsModule,
    NgxMaterialTimepickerModule,
    HttpClientModule,
    StoreModule.forRoot({ 
      [SITTER_KEY]: sitterReducer,
      [USER_KEY]: userReducer,
      [ORDER_KEY]: boardReducer
    }),
    EffectsModule.forRoot([SitterEffects, UserEffects, BoardEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, 
    })
  ],
  providers: [UserService, SitterService, AuthGuard, AuthService, BoardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
