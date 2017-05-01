import { Component, ViewChild } from '@angular/core';
import {PasswordChangeComponent} from './user-management/password-change.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild(PasswordChangeComponent) passwordModalComponent;

  togglePasswordChange() {
    this.passwordModalComponent.toggleModal();
  }
}
