import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Contact } from '../../../../sqlite/src/app/models/contact';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db: SQLiteObject | undefined;

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {}

  async initializeDatabase() {
    await this.platform.ready();

    if (this.platform.is('cordova') || this.platform.is('capacitor')) {
      try {
        this.db = await this.sqlite.create({
          name: 'contacts.db',
          location: 'default'
        });
        await this.createTables();
        console.log('Database initialized on device');
      } catch (error) {
        console.error('Error initializing database', error);
        throw error;
      }
    } else {
      console.warn('SQLite plugin no disponible - no se inicializa base de datos nativa');
      // Opcional: implementar almacenamiento alternativo para navegador
    }
  }

  private async createTables() {
    if (!this.db) return;

    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS users(
                                        id TEXT PRIMARY KEY,
                                        email TEXT NOT NULL,
                                        name TEXT NOT NULL,
                                        birthday TEXT,
                                        description TEXT,
                                        profilePhoto TEXT
      )
    `, []);

    await this.db.executeSql(`
      CREATE TABLE IF NOT EXISTS favourites(
                                             owner_id TEXT,
                                             contact_id TEXT,
                                             FOREIGN KEY(owner_id) REFERENCES users(id),
                                             FOREIGN KEY(contact_id) REFERENCES users(id)
      )
    `, []);
  }

  async getContact(id: string): Promise<Contact | undefined> {
    if (!this.db) {
      console.warn('DB no inicializada');
      return undefined;
    }
    const res = await this.db.executeSql(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    return res.rows.length ? res.rows.item(0) : undefined;
  }

  async getFavourites(ownerId: string): Promise<Contact[]> {
    if (!this.db) {
      console.warn('DB no inicializada');
      return [];
    }
    const res = await this.db.executeSql(
      `SELECT u.* FROM users u
                         JOIN favourites f ON u.id = f.contact_id
       WHERE f.owner_id = ?`,
      [ownerId]
    );
    return Array.from({ length: res.rows.length }, (_, i) => res.rows.item(i));
  }

  async addFavourite(ownerId: string, contactId: string) {
    if (!this.db) {
      console.warn('DB no inicializada');
      return;
    }
    await this.db.executeSql(
      'INSERT INTO favourites (owner_id, contact_id) VALUES (?, ?)',
      [ownerId, contactId]
    );
  }

  async removeFavourite(ownerId: string, contactId: string) {
    if (!this.db) {
      console.warn('DB no inicializada');
      return;
    }
    await this.db.executeSql(
      'DELETE FROM favourites WHERE owner_id = ? AND contact_id = ?',
      [ownerId, contactId]
    );
  }
}
