import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ItemsComponent } from './items/items.component';
import { SubactivitiesComponent } from './subactivities/subactivities.component';
import { routes } from './app-routing.module';
import { PlanComponent } from './plan/plan.component';
import { SharedModule } from './_modules/shared.module';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { SubDetailComponent } from './subactivities/subactivity-detail/sub-detail/sub-detail.component';
import { SubEditComponent } from './subactivities/subactivity-edit/sub-edit/sub-edit.component';
import { ItemCreateComponent } from './items/item-create/item-create.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ItemsComponent,
    SubactivitiesComponent,
    PlanComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemEditComponent,
    TextInputComponent,
    SubDetailComponent,
    SubEditComponent,
    ItemCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    NgxSpinnerModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
