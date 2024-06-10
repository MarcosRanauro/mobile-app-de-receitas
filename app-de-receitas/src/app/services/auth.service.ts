import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { getDatabase, ref, set, push } from "firebase/database";
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';

// Inicializando o Firebase
const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/users';

  constructor(private navCtrl: NavController) {}

  registerUser(user: any): Promise<void> {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(result => {
        const userRef = push(ref(db, this.dbPath));
        return set(userRef, { ...user, uid: result.user?.uid });
      });
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
      return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
          this.navCtrl.navigateForward(['/home']);
          return result;
      })
  }
}
