import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { SubactivitiesComponent } from './subactivities/subactivities.component';
import { PlanComponent } from './plan/plan.component';
import { AuthGuard } from './_guards/auth.guard';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'items', component: ItemsComponent},
      {path: 'subactivities', component: SubactivitiesComponent},
      {path: 'plan', component: PlanComponent},

    ]
  },
  
  {path: '**', component: HomeComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
