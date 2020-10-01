import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { SubactivitiesComponent } from './subactivities/subactivities.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'items', component: ItemsComponent},
  {path: 'subactivities', component: SubactivitiesComponent},
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
