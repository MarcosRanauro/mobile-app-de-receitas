import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  private favoritos: any[] = [];

  constructor() { }

  addFavorite(receita: any) {
    if(!this.favoritos.find(item => item.idMeal === receita.idMeal)) {
      this.favoritos.push(receita);
    }
  }

  getFavorites() {
    return this.favoritos;
  }

  removeFavorite(id: string) {
    this.favoritos = this.favoritos.filter(item => item.idMeal !== id);
  }
}
