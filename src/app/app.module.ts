import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LogoutMessageModalComponent } from './Modals/logout-message-modal/logout-message-modal.component';
import { LogInMessageModalComponent } from './Modals/log-in-message-modal/log-in-message-modal.component';
import { FootballerCardModalComponent } from './Modals/footballer-card-modal/footballer-card-modal.component';
import { RegisterMessageModalComponent } from './Modals/register-message-modal/register-message-modal.component';
import { SearchService } from './Services/searchService.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { AuthenticationService } from './Services/authentication.service';
import { AppRoutingModule } from './app-routing-module';
import { AlertComponent } from './alert/alert.component';
import { JwtInterceptor, ErrorInterceptor, fakeBackendProvider } from './_helpers';
import { RxjsExamplesComponent } from './rxjs-examples/rxjs-examples.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AlertComponent,
    HomepageComponent,
    LogoutMessageModalComponent,
    LogInMessageModalComponent,
    FootballerCardModalComponent,
    RegisterMessageModalComponent,
    JumbotronComponent,
    RxjsExamplesComponent
  ],
  entryComponents: [
    FootballerCardModalComponent,
    LogInMessageModalComponent,
    LogoutMessageModalComponent,
    RegisterMessageModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [
    SearchService,
    NgbActiveModal,
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
