import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { AlertModule, ButtonsModule, PaginationModule, ModalModule, TypeaheadModule, TabsModule, ProgressbarModule } from 'ngx-bootstrap';

import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { <%= componentName %> } from './<%= componentFileName %>.component';

import { <%= serviceName %> } from './<%= serviceFileName %>.service';
import { <%= listItemComponentName %> } from './<%= listItemComponentFileName %>.component';

const <%= modelInPlural %>Routes: Routes = [
    { path: '', component: <%= componentName %> }
];

export const <%= modelInPlural %>Routing = RouterModule.forChild(<%= modelInPlural %>Routes);

@NgModule({
  imports: [
    <%= modelInPlural %>Routing,
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    NKDatetimeModule,
    AlertModule.forChild(),
    ButtonsModule.forChild(),
    PaginationModule.forChild(),
    ModalModule.forChild(),
    TypeaheadModule.forChild(),
    TabsModule.forChild(),
    ProgressbarModule.forChild(),
  ],
  declarations: [
    <%= componentName %>,
    <%= listItemComponentName %>
  ],
  providers: [<%= serviceName %>]
})
export class <%= moduleName %> { }
