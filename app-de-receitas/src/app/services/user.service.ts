import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async getUserData(uid: string): Promise<any> {
    const userDoc = await this.firestore.collection('users').doc(uid).ref.get();
    return userDoc.data();
  }

  async updateUserData(user:any): Promise<void> {
    const currentUser = await this.afAuth.currentUser;
    if(currentUser) {
      await this.firestore.collection('users').doc(currentUser.uid).set(user);
      console.log('User data updated successfully');
    } else {
      console.error('User not found');
    }
  }
}
