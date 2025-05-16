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
import {UserService} from "../../services/user.service";
import {Contact} from "../../models/contact";
import {firstValueFrom, Observable, of} from "rxjs";
import {ContactBoxComponent} from "../../components/contact-box/contact-box.component";
import {AsyncPipe, CommonModule, NgForOf} from "@angular/common";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonList, ContactBoxComponent, NgForOf, AsyncPipe, CommonModule, IonButton],
})
export class HomePage implements OnInit {

  favourites: { [id: string]: boolean } = {};
  private favoriteUrl:string ='' ;
  contacts$!: Observable<Contact[]>;
  constructor(
    private userService: UserService,
    private navCtrl: NavController,
    private databaseService: DatabaseService
    ) {}

  ngOnInit() {
    this.loadContactsAndFavourites()
  }

  ionViewWillEnter() {
    this.loadContactsAndFavourites();
  }

  async loadContactsAndFavourites() {
    const contactsArray = await firstValueFrom(this.userService.getUsers());
    this.contacts$ = of(contactsArray);

    for (const contact of contactsArray) {
      const isFav = await this.databaseService.isFavorite(contact.id);
      this.favourites[contact.id] = isFav;
    }
  }

  showContact(contact: Contact) {
    this.navCtrl.navigateForward(['/contact-detail', contact.id]);
  }

  isFavourite(contact: Contact): boolean {
    return this.favourites[contact.id] ?? false;
  }

  toggleFavorite(contact:Contact) {
    if (this.isFavourite(contact)) {
      this.databaseService.removeFavorite(contact.id);
      this.favourites[contact.id] = false;

    }else {
      this.databaseService.addFavorite(contact);
      this.favourites[contact.id] = true;
    }
  }
}
