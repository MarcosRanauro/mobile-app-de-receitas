import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {

  id: string = '';
  receita: any;
  video: any;
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private favoriteService: FavoritesService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = idParam;
      this.buscarDetalhesReceita();
      this.verificarFavorito();
    }
  }

  buscarDetalhesReceita() {
    this.apiService.buscarDetalhesReceita(this.id).subscribe((data) => {
      this.receita = data.meals[0];
      console.log(this.receita);
    });
  }

  async verificarFavorito() {
    this.isFavorite = await this.favoriteService.isFavorite(this.id);
  }

  mostrarVideo() {
    if(this.receita.strYoutube) {
      this.video = this.getVideoEmbedUrl(this.receita.strYoutube);
    }
  }

  getVideoEmbedUrl(url: string): string {
    const videoId = url.split('v=')[1];
    return `https://www.youtube.com/embed/${videoId}`;
  }

  async adicionarAosFavoritos() {
    try {
      await this.favoriteService.addFavorite(this.receita);
      this.isFavorite = true;
      this.toastr.success('Receita adicionada aos favoritos.', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });
    } catch (error) {
      console.error('Erro ao adicionar receita aos favoritos:', error);
      this.toastr.error('Erro ao adicionar receita aos favoritos. Por favor, tente novamente.', 'Erro', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });
    }
  }

  async removerDosFavoritos() {
    try {
      await this.favoriteService.removeFavorite(this.id);
      this.isFavorite = false;
      this.toastr.success('Receita removida dos favoritos.', 'Sucesso', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });
    } catch (error) {
      console.error('Erro ao remover receita dos favoritos:', error);
      this.toastr.error('Erro ao remover receita dos favoritos. Por favor, tente novamente.', 'Erro', {
        timeOut: 5000,
        progressBar: true,
        closeButton: true
      });
    }
  }
}
