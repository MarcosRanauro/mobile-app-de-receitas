import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FavoritesService } from '../services/favorites.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {

  favoritos: any[] = [];

  constructor(private navCtrl: NavController, private favoritesService: FavoritesService, private toastr: ToastrService) { }

  async ngOnInit() {
    this.getFavorites();
    await this.loadFavorites();
  }

  async loadFavorites() {
    this.favoritos = await this.favoritesService.getFavoritesFromFirestore();
  }

  async getFavorites() {
    try {
      this.favoritos = await this.favoritesService.getFavoritesFromFirestore();
    } catch (error) {
      console.error('Erro ao buscar favoritos do Firestore:', error);
    }
  }

  async removerDosFavoritos(id: string) {
    try {
      await this.favoritesService.removeFavorite(id);
      this.favoritos = this.favoritos.filter((receita) => receita.idMeal !== id);
      this.toastr.success('Receita removida dos favoritos com sucesso!');
    } catch (error) {
      console.error('Erro ao remover receita dos favoritos:', error);
      this.toastr.error('Erro ao remover receita dos favoritos. Tente novamente mais tarde.');
    }
  }

  abrirDetalhesReceita(id: string) {
    this.navCtrl.navigateForward(`/detalhes/${id}`);
  }
}
