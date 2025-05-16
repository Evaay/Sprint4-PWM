import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // <-- Importa IonicModule completo
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
  imports: [IonicModule],  // <-- Aquí solo IonicModule (no componentes individuales)
})
export class ContactListPage implements OnInit {
  contacts: Contact[] = [];
  favourites: Contact[] = [];
  currentUserId: string = 'test-user-id'; // Cambiar por ID real del usuario

  constructor(
    private userService: UserService,
    private databaseService: DatabaseService
  ) {
    addIcons({ star, starOutline });
  }

  async ngOnInit() {
    await this.databaseService.initializeDatabase();
    this.loadContacts();  // si loadContacts no es async, está bien sin await
    await this.loadFavourites();  // si loadFavourites es async, hay que await aquí
  }


  private loadContacts() {
    this.userService.getUsers().subscribe({
      next: (contacts) => this.contacts = contacts,
      error: (err) => console.error('Error loading contacts:', err)
    });
  }

  private async loadFavourites() {
    try {
      this.favourites = await this.databaseService.getFavourites(this.currentUserId);
    } catch (error) {
      console.error('Error loading favourites:', error);
    }
  }

  async toggleFavourite(contact: Contact) {
    try {
      if (this.isFavourite(contact.id)) {
        await this.databaseService.removeFavourite(this.currentUserId, contact.id);
      } else {
        await this.databaseService.addFavourite(this.currentUserId, contact.id);
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
