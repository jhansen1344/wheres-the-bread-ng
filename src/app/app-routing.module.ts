import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ItemsComponent } from './items/items.component';
import { SubactivitiesComponent } from './subactivities/subactivities.component';
import { PlanComponent } from './plan/plan.component';
import { AuthGuard } from './_guards/auth.guard';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { SubDetailComponent } from './subactivities/subactivity-detail/sub-detail/sub-detail.component';
import { SubEditComponent } from './subactivities/subactivity-edit/sub-edit/sub-edit.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      {path: 'items', component: ItemListComponent},
      {path: 'items/:id', component: ItemDetailComponent},
      {path: 'item/edit/:id', component: ItemEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},
      {path: 'subactivities', component: SubactivitiesComponent},
      {path: 'subactivities/:id', component: SubDetailComponent},
      {path: 'subactivity/edit/:id', component: SubEditComponent, canDeactivate:[PreventUnsavedChangesGuard]},

      {path: 'plan', component: PlanComponent},
    ]
  },
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},

  {path: '**', component: NotFoundComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
