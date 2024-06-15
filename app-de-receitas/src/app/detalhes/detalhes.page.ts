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

  constructor(private route: ActivatedRoute, private apiService: ApiService, private favoriteService: FavoritesService, private toastr: ToastrService) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.id = idParam;
      this.buscarDetalhesReceita();
    }
  }

  buscarDetalhesReceita() {
    this.apiService.buscarDetalhesReceita(this.id).subscribe((data) => {
      this.receita = data.meals[0];
      console.log(this.receita);
    });
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

  adicionarAosFavoritos() {
    this.favoriteService.addFavorite(this.receita);
    this.toastr.success('Receita adicionada aos favoritos', 'Favoritos');
  }
}
