import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, query, where, DocumentData, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritos: any[] = [];

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) { }

  async addFavorite(receita: any): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const firestore = getFirestore();
      const userFavoritosRef = collection(firestore, 'users', user.uid, 'favoritos');
      try {
        await addDoc(userFavoritosRef, receita);
        console.log('Receita adicionada aos favoritos do usuário no Firestore');
      } catch (error) {
        console.error('Erro ao adicionar receita aos favoritos do usuário:', error);
        throw error;
      }
    } else {
      console.error('Usuário não autenticado.');
      // Lógica para lidar com o usuário não autenticado, se necessário
    }
  }

  async getFavoritesFromFirestore(): Promise<any[]> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const firestore = getFirestore();
      const userFavoritosRef = collection(firestore, 'users', user.uid, 'favoritos');
      const querySnapshot = await getDocs(userFavoritosRef);
      const favoritos: any[] = [];
      querySnapshot.forEach((doc) => {
        favoritos.push(doc.data());
      });
      return favoritos;
    } else {
      console.error('Usuário não autenticado.');
      // Lógica para lidar com o usuário não autenticado, se necessário
      return [];
    }
  }

  async removeFavorite(idMeal: string): Promise<void> {
    const user = await this.afAuth.currentUser;
    if (user) {
      const firestore = getFirestore();
      const userFavoritosRef = collection(firestore, 'users', user.uid, 'favoritos');
      const q = query(userFavoritosRef, where('idMeal', '==', idMeal)); // Query para encontrar o documento com idMeal correspondente
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (docSnapshot) => {
        const docRef = doc(userFavoritosRef, docSnapshot.id); // Referência ao documento específico no Firestore
        await deleteDoc(docRef); // Deleta o documento
      });
      console.log('Receita removida dos favoritos do usuário no Firestore');
    } else {
      console.error('Usuário não autenticado.');
    }
  }

  async isFavorite(id: string): Promise<boolean> {
    const user = await this.afAuth.currentUser;
    if(user) {
      const firestore = getFirestore();
      const userFavoritosRef = collection(firestore, 'users', user.uid, 'favoritos');
      const q = query(userFavoritosRef, where('idMeal', '==', id));
      const querySnapshot = await getDocs(q);
      return !querySnapshot.empty;
    } else {
      console.error('Usuário não autenticado.');
      // Lógica para lidar com o usuário não autenticado, se necessário
      return false;
    }
  }

  getFavorites() {
    return this.favoritos;
  }
}
