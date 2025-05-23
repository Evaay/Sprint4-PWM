import {Injectable} from '@angular/core';
import {Capacitor} from '@capacitor/core';
import {CapacitorSQLite, SQLiteConnection, SQLiteDBConnection} from '@capacitor-community/sqlite';
import {Contact} from "../models/contact";
import {Platform} from '@ionic/angular';


@Injectable({
  providedIn: 'root',
})
export class DatabaseService {


  private sqlite: SQLiteConnection;
  private db: SQLiteDBConnection | null = null;
  private isWeb: boolean = false;
  private readonly STORAGE_KEY = 'favorites';
  private readonly STORAGE_DB = 'favoritesDB';


  constructor(private platform: Platform) {
    this.sqlite = new SQLiteConnection(CapacitorSQLite);
    this.init();
  }

  private async init() {
    await this.platform.ready();
    this.isWeb = Capacitor.getPlatform() === 'web';

    if (!this.isWeb) {
      try {
        const db = await this.sqlite.createConnection(
          this.STORAGE_DB, false, 'no-encryption', 1, false
        );
        await db.open();
        this.db = db;
        await db.execute(`
          CREATE TABLE IF NOT EXISTS favorites (
            id TEXT PRIMARY KEY,
            name TEXT,
            birthday TEXT,
            email TEXT,
            description TEXT,
            photo TEXT
          );
        `);
      } catch (error) {
        console.error('Error opening SQLite database', error);
      }
    }
  }

  async addFavorite(contact: Contact): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const exists = favorites.some(fav => fav.id === contact.id);
      if (!exists) {

        const favoriteContact = {
          id: contact.id,
          name: contact.name,
          birthday: contact.birthday,
          email: contact.email,
          description: contact.description,
          profilePhoto: contact.profilePhoto
        };

        favorites.push(favoriteContact);

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(favorites));
      }
    } else if (this.db) {
      await this.db.run(
        `INSERT OR REPLACE INTO favorites (id, name, birthday, email, description, photo) VALUES (?, ?, ?, ?, ?, ?)`,
        [contact.id, contact.name, contact.birthday, contact.email,contact.description, contact.profilePhoto]
    );
    }
  }


  async removeFavorite(id: string): Promise<void> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      const updatedFavorites = favorites.filter((fav: any) => fav.id !== id);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedFavorites));
    } else if (this.db) {
      await this.db.run(`DELETE FROM favorites WHERE id = ?`, [id]);
    }
  }

  async getFavorites(): Promise<Contact[]> {
    if (this.isWeb) {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } else if (this.db) {
      const res = await this.db.query(`SELECT * FROM favorites`);
      return res.values ?? [];
    }
    return [];
  }

  async isFavorite(id: string): Promise<boolean> {
    if (this.isWeb) {
      const favorites = await this.getFavorites();
      return favorites.some((fav: any) => fav.id === id);
    } else if (this.db) {
      const res =
        await this.db.query(`SELECT id FROM favorites WHERE id = ?`, [id]);
      //return res.values?.length > 0 ?? false;
      return !!(res.values && res.values.length > 0);
    }

    return false;
  }

  async clearFavorites(): Promise<void> {
    if (this.isWeb) {
      localStorage.removeItem(this.STORAGE_KEY);
    } else if (this.db) {
      await this.db.execute(`DELETE FROM favorites`);
    }
  }

}
