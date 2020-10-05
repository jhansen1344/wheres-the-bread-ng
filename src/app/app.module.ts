import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    ItemsComponent,
    SubactivitiesComponent,
    PlanComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SharedModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
