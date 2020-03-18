import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SitterContainer } from './sitter/sitter.container';

const routes: Routes = [
  {path: 'sitter', component: SitterContainer}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
