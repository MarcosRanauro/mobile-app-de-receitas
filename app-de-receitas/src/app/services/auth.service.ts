import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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

  constructor(private navCtrl: NavController) { }

  registerUser(user: any): Promise<void> {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(result => {
        const userRef = push(ref(db, this.dbPath));
        return set(userRef, { ...user, uid: result.user?.uid });
      })
      .catch(error => {
        throw error;
      });
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        this.navCtrl.navigateForward(['/home']);
        return result;
      })
  }

  // Autenticação com Popup do Google
  loginWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userRef = ref(db, `${this.dbPath}/${user.uid}`);
        set(userRef, {
          name: user.displayName,
          email: user.email,
          uid: user.uid
        });
        this.navCtrl.navigateForward(['/home']);
      })
      .catch(error => {
        console.error('Error during Google login:', error);
      });
  }
}
