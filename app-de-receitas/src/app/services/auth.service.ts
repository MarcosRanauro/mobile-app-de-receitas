import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, GoogleAuthProvider, signInWithPopup, updateProfile, User, updateEmail } from 'firebase/auth';
import { getDatabase, ref, set, push } from "firebase/database";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

// Inicializando o Firebase
const app = initializeApp(environment.firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const firestore = getFirestore(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private dbPath = '/users';

  constructor(private navCtrl: NavController, private afAuth: AngularFireAuth) { }

  registerUser(user: any): Promise<void> {
    return createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(async result => {
        const userRef = doc(firestore, `users/${result.user?.uid}`);
        await setDoc(userRef, {
          displayName: user.name,
          email: user.email,
          uid: result.user?.uid
        }, { merge: true });
        this.navCtrl.navigateForward(['/home']);
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
        const userRef = doc(firestore, `users/${user.uid}`);
        setDoc(userRef, {
          displayName: user.displayName,
          email: user.email,
          uid: user.uid
        }, { merge: true });
        this.navCtrl.navigateForward(['/home']);
      })
      .catch(error => {
        console.error('Error during Google login:', error);
      });
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      setTimeout(() => {
        this.navCtrl.navigateRoot('/login');
      }, 500);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<User | null> {
    return auth.currentUser;
  }

  async updateUserProfile(user: any): Promise<void> {
    const currentUser = await this.getCurrentUser();
    if (currentUser) {
      await updateProfile(currentUser, {
        displayName: user.displayName
      });

      if (user.email && user.email !== currentUser.email) {
        await updateEmail(currentUser, user.email);
      }

      const userRef = doc(firestore, `users/${currentUser.uid}`);
      await setDoc(userRef, user, { merge: true });

      console.log('Perfil atualizado com sucesso!');
    } else {
      console.error('Usuário não autenticado');
    }
  }
}
