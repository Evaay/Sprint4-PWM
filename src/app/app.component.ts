import { Component } from '@angular/core';
import {IonApp, IonItem, IonList, IonMenuToggle, IonRouterLink, IonRouterOutlet} from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonRouterLink, RouterLink, IonMenuToggle],
})
export class AppComponent {
  constructor() {}
}
