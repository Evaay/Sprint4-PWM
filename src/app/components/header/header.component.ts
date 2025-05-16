import { Component } from '@angular/core';
import {IonButton, IonCol, IonGrid, IonHeader, IonRow} from "@ionic/angular/standalone";
import {Router, RouterModule} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    IonHeader, RouterModule, IonButton, IonGrid, IonCol, IonRow
  ]
})
export class HeaderComponent {
  constructor(private router: Router) { }
  register(){
    this.router.navigate(['create-account']);
  }
  login(){
    this.router.navigate(['log-in']);
  }

  goToMainPage() {
    this.router.navigate(['main-page']);
  }
}
