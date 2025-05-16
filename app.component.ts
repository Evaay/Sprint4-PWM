import {Component, inject} from '@angular/core';
import {IonApp, IonItem, IonList, IonMenuToggle, IonRouterLink, IonRouterOutlet} from '@ionic/angular/standalone';
import {
  IonContent,
  IonHeader,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import {RouterLink} from "@angular/router";
import {logOut} from "ionicons/icons";
import {Router} from '@angular/router';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, IonContent, IonHeader, IonMenu, IonTitle, IonToolbar, IonList, IonItem, IonRouterLink, RouterLink, IonMenuToggle],
})
export class AppComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  logout() {
    this.authService.logOut().then(() => {
      this.router.navigateByUrl('/log-in');
    });
  }
}
