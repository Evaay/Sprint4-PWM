import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';
import { UserService } from '../../services/user.service';
import { DatabaseService } from '../../services/database.service';
import { Contact } from '../../models/contact';
import { addIcons } from 'ionicons';
import { star, starOutline } from 'ionicons/icons';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.page.html',
  styleUrls: ['./contact-list.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonMenuButton,
    IonList,
    IonItem,
    IonAvatar,
    IonLabel,
    IonButton,
    IonIcon
  ]
})
export class ContactListPage implements OnInit {
  favourites: Contact[] = [];
  currentUserId: string = 'test-user-id';

  constructor(
    private userService: UserService,
    private databaseService: DatabaseService
  ) {
    addIcons({ star, starOutline });
  }

  async ngOnInit() {
    this.loadFavourites();
  }


  private async loadFavourites() {
    try {
      this.favourites = await this.databaseService.getFavorites();
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  }

  async toggleFavourite(contact: Contact) {
    try {
      if (this.isFavourite(contact.id)) {
        await this.databaseService.removeFavorite(contact.id);
      } else {
        await this.databaseService.addFavorite(contact);
      }
      await this.loadFavourites();
    } catch (error) {
      console.error('Error updating favourites:', error);
    }
  }

  isFavourite(contactId: string): boolean {
    return this.favourites.some(f => f.id === contactId);
  }
}
