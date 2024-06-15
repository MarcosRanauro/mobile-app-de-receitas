import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: any[] = [];

  constructor(private navCtrl: NavController, private favoritesService: FavoritesService) { }

  ngOnInit() {
    this.getFavorites();
  }

  async getFavorites() {
    try {
      this.favoritos = await this.favoritesService.getFavoritesFromFirestore();
    } catch (error) {
      console.error('Erro ao buscar favoritos do Firestore:', error);
    }
  }

  abrirDetalhesReceita(id: string) {
    this.navCtrl.navigateForward(`/detalhes/${id}`);
  }
}
