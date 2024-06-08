import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {
  categoria: string = '';
  receitas: any;

  constructor(private route: ActivatedRoute, private apiService: ApiService, private navCtrl: NavController) { }

  ngOnInit() {
    const categoriaParam = this.route.snapshot.paramMap.get('categoria');
    if (categoriaParam) {
      this.categoria = categoriaParam;
      this.buscarReceitasPorCategoria();
    }
  }

  buscarReceitasPorCategoria() {
    this.apiService.buscarReceitasPorCategoria(this.categoria).subscribe((data) => {
      this.receitas = data.meals;
      console.log(this.receitas);
    });
  }

  abrirDetalhesReceita(id: string) {
    this.navCtrl.navigateForward(`/detalhes/${id}`);
  }
}
