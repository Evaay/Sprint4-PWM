import {Component, OnInit} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonList, IonButton, NavController
} from '@ionic/angular/standalone';
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Contact} from "../../models/contact";
import {Observable} from "rxjs";
import {ContactBoxComponent} from "../../components/contact-box/contact-box.component";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, ContactBoxComponent, NgForOf, AsyncPipe, CommonModule ],
})
export class HomePage implements OnInit {
  contacts$!: Observable<Contact[]>;
  constructor(
    private userService: UserService,
    private navCtrl: NavController
    ) {}

  ngOnInit() {
    this.loadContacts();
  }

  ionViewWillEnter() {
    this.loadContacts();
  }

  loadContacts() {
    this.contacts$ = this.userService.getUsers();

  }

  showContact(contact: Contact) {
    this.navCtrl.navigateForward(['/contact-detail', contact.id]);
  }

  isFavorite: boolean = false;
  toggleFavorite() {
    this.isFavorite = !this.isFavorite;
    const imageFavourite = document.getElementById('icon-favourite') as HTMLImageElement;
    if (this.isFavorite) {
      imageFavourite.src = "assets/images/favorito-with-color.png";
    } else {
      imageFavourite.src = "assets/images/favorito-without-color.png";
    }
  }
}
