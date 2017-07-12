import { Component, ViewChild } from '@angular/core';

@Component({
  selector: '<%= prefix %>-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  sidenavOpened = false;

  openNav() {
    this.sidenavOpened = true;
  }

  closeNav() {
    this.sidenavOpened = false;
  }

  getSidenavWidth() {
    if (this.sidenavOpened) {
      return '250px';
    }

    return '0';
  }
}
