import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocationStrategy } from '@angular/common';
import { HashLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent} from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { CaloricneedsComponent } from './components/caloricneeds/caloricneeds.component';
//imports for loading bar below
//import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

// for Http import LoadingBarHttpModule:
 import { LoadingBarHttpModule } from '@ngx-loading-bar/http';
import { ChatComponent } from './components/chat/chat.component';

// for Router import LoadingBarRouterModule:
// import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
const appRoutes: Routes =  [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'caloricneeds', component: CaloricneedsComponent, canActivate:[AuthGuard]},
  {path:'chat', component: ChatComponent, canActivate:[AuthGuard]}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    CaloricneedsComponent,
    ChatComponent
  ],
  imports: [
    //  LoadingBarHttpClientModule,

    // for Http use:
     LoadingBarHttpModule,

    // for Router use:
  //   LoadingBarRouterModule,

    // for HttpClient use:
  //   LoadingBarHttpClientModule,

    HttpClientModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard,DashboardComponent, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

