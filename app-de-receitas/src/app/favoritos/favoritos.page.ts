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
    this.favoritos = this.favoritesService.getFavorites();
  }

  abrirDetalhesReceita(id: string) {
    this.navCtrl.navigateForward(`/detalhes/${id}`);
  }
}
