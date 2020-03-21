import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitterContainer } from './sitter/sitter.container';
import { SitterComponent } from './sitter/sitter.component';

const routes: Routes = [
  {
    path: 'sitter', component: SitterContainer,
    children: [{path: '', component: SitterComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
