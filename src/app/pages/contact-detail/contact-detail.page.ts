import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAvatar, IonBackButton, IonButtons,
  IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonText,
  IonTitle, IonToggle,
  IonToolbar
} from '@ionic/angular/standalone';
import {ActivatedRoute} from "@angular/router";
import {Contact} from "../../models/contact";
import {UserService} from "../../services/user.service";
import {DatabaseService} from "../../services/database.service";

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.page.html',
  styleUrls: ['./contact-detail.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonCardHeader, IonCard, IonAvatar, IonCardTitle, IonCardSubtitle, IonText, IonCardContent, IonContent, IonTitle, IonBackButton, IonButtons, IonToolbar, IonHeader, IonToggle]
})
export class ContactDetailPage implements OnInit {
  favourites: Contact[] = [];
  userId!: string;
  user!: Contact;
  name: string = ' ';
  email: string = ' ';
  birthday: string = ' ';
  description: string = ' ';
  profilePhoto: string = 'assets/images/userphoto.png';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private databaseService: DatabaseService,
    ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.userId = id;
      this.userService.getUserByID(id).subscribe(user => {
        this.user = user;
        this.profilePhoto = user.profilePhoto;
        this.name = user.name;
        this.email = user.email;
        this.birthday = user.birthday;
        this.description = user.description;
      })
    }
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

  onFavoriteChange(event: CustomEvent) {
    this.toggleFavourite(this.user);
  }


}
