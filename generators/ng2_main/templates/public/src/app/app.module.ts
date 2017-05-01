import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet, Route } from '@angular/router';
import { AlertModule, ButtonsModule, PaginationModule, ModalModule, TypeaheadModule, TabsModule, ProgressbarModule } from 'ngx-bootstrap';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppComponent } from './app.component';
import { PersonsComponent } from './persons/persons.component';
import { PersonsTableComponent } from './persons/persons-table.component';
import { LoginComponent } from './user-management/login.component';
import { DropDownMenuComponent } from './user-management/dropdown-menu.component';
import { UmComponent } from './user-management/um.component';
import { PasswordChangeComponent } from './user-management/password-change.component';

import { PersonsService } from './persons/persons.service';
import { UmService } from './user-management/um.service';
import { UserService } from './user.service';

import { AuthGuard } from './auth-guard.service';

const routes: Route[] = [
  {
    path: '',
    redirectTo: 'persons',
    pathMatch: 'full'
  },
  {
    path: 'persons',
    component: PersonsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'um',
    component: UmComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PersonsComponent,
    PersonsTableComponent,
    LoginComponent,
    UmComponent,
    DropDownMenuComponent,
    PasswordChangeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(routes, { useHash: true }),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    TabsModule.forRoot(),
    ProgressbarModule.forRoot(),
    NKDatetimeModule
  ],
  providers: [PersonsService, UmService, AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
