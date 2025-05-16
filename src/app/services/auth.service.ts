import {inject, Injectable} from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  signInWithEmailAndPassword,
  updatePassword, EmailAuthProvider,
  authState,
} from '@angular/fire/auth';
import {User} from '../models/user.interface';
import {UserService} from './user.service';
import {toast} from 'ngx-sonner';
import {Observable} from 'rxjs';
import {User as FirebaseUser} from '@firebase/auth';
import { signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestoreService = inject(UserService);

  signUp(userData: User) {
    return createUserWithEmailAndPassword(this.auth, userData.email, userData.password!).then(userCredential => {
      const user = userCredential.user;

      //se crea un nuevo usuario con los datos pasados por parametro que vienen del formulario
      //de createAccount
      const newUser: User = {
        id: user.uid,
        email: userData.email,
        name: userData.name,
        birthday: userData.birthday,
        profilePhoto: userData.profilePhoto,
        contact: userData.contact,
        request: userData.request,
        chat: userData.chat,
      };

      return this.firestoreService.addNewUser(user.uid, newUser);
    });
  }

  signIn(user: User) {
    return signInWithEmailAndPassword(this.auth, user.email, user.password!);
  }

  getCurrentUserId(){
    return this.auth.currentUser?.uid;
  }

  changePassword(password: string) {
    const currentUser = this.auth.currentUser;
    if (currentUser) {
      updatePassword(currentUser, password).then(() => {
        toast.success('Contraseña cambiada correctamente');
      }).catch(error => {
        toast.error("No se ha podido cambiar la contraseña");
      });
    }
  }

  async logOut() {
    await signOut(this.auth);
  }

  async verificationCredentials(password: string): Promise<boolean> {
    const currentUser = this.auth.currentUser;

    if (currentUser?.email) {
      const credential = EmailAuthProvider.credential(currentUser.email, password);

      try {
        await reauthenticateWithCredential(currentUser, credential);
        return true;
      } catch (error) {
        return false;
      }
    }
    return false;
  }

  get authState(): Observable<FirebaseUser | null> {
    return authState(this.auth);
  }
}
