import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouterLink, RouterLinkActive, RouterOutlet, Route } from '@angular/router';
import { AlertModule, ButtonsModule, PaginationModule, ModalModule, TypeaheadModule, TabsModule, ProgressbarModule } from 'ngx-bootstrap';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppComponent } from './app.component';

import { UserService } from './user.service';

import { AuthGuard } from './auth-guard.service';

const routes: Route[] = [

];

@NgModule({
  declarations: [
    AppComponent
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
  providers: [AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
