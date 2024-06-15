import { Injectable } from '@angular/core';
import { getFirestore, collection, getDocs, query, where, DocumentData, addDoc } from 'firebase/firestore';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritos: any[] = [];

  constructor(private afAuth: AngularFireAuth) { }

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

  getFavorites() {
    return this.favoritos;
  }

  removeFavorite(id: string) {
    this.favoritos = this.favoritos.filter(item => item.idMeal !== id);
  }
}
