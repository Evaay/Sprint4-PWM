import {inject, Injectable} from '@angular/core';
import {
  collection,
  doc,
  collectionData,
  docData,
  arrayUnion,
  arrayRemove,
  Firestore, setDoc, updateDoc
} from '@angular/fire/firestore';
import { User } from '../models/user.interface';
import {Observable} from 'rxjs';
import {Contact} from "../models/contact";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firestore: Firestore) {}

  async addNewUser(id:string, user:User) {
    try {
      const userRef = doc(this.firestore, `users/${id}`);
      await setDoc(userRef, user);
    }catch (error) {
      console.log("Error de agregar usuario", error);
    }
  }

  getUserByID(id:string):Observable<Contact> {
    const userRef = doc(this.firestore, `users/${id}`);
    return docData(userRef, {idField:'id'}) as Observable<Contact>;
  }

  async editUser(id:string, data:Partial<User>) {
    try {
      const userRef = doc(this.firestore, `users/${id}`);
      await updateDoc(userRef, data);
    }catch (error) {
      console.log("Error de editar perfil", error);
    }
  }

  getUsers(): Observable<Contact[]> {
    const usersRef = collection(this.firestore, 'users');
    return collectionData(usersRef, {idField: 'id'}) as Observable<Contact[]>;
  }


  async addNewContact(currentId: string, requestId: string) {
    try {
      const userRef = doc(this.firestore, `users/${currentId}`);
      await updateDoc(userRef, { request: arrayRemove(requestId)});
      await updateDoc(userRef, { contact: arrayUnion(requestId)});
    }catch (error) {
      console.log("Error de añadir al contacto", error);
    }
  }

  async rejectInvitation(currentId: string, requestId: string) {
    try {
      const userRef = doc(this.firestore, `users/${currentId}`);
      await updateDoc(userRef, { request: arrayRemove(requestId)});
    }catch (error) {
      console.log("Error de añadir al contacto", error);
    }
  }
}
