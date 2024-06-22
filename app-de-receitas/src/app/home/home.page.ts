import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  receitas: any[] = [];
  dataReturned: any;
  user: any;

  constructor(
    private apiService: ApiService,
    private navCtrl: NavController,
    private authService: AuthService,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.buscarCategorias();
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const currentUser = await this.authService.getCurrentUser();
    if(currentUser) {
      this.user = await this.userService.getUserData(currentUser.uid);
      console.log('User:', this.user);
    }
  }

  buscarCategorias() {
    this.apiService.buscarCategorias().subscribe((data) => {
      this.dataReturned = data;
      console.log(this.dataReturned);
    });
  }

  abrirCategoria(categoria: string) {
    this.navCtrl.navigateForward(`/categoria/${categoria}`);
  }

  navegarPerfil() {
    this.navCtrl.navigateForward(`/perfil`);
  }

  pesquisar(event: any) {
    const pesquisa = event.target?.value || '';

    if(pesquisa.trim() === '') {
      this.receitas = [];
      return;
    }

    this.apiService.pesquisarReceitas(pesquisa)
    .subscribe((data: any) => {
      if(data.meals) {
        this.receitas = data.meals;
      } else {
        this.receitas = [];
      }
    }, error => {
      console.error('Erro ao buscar receitas:', error);
      this.receitas = [];
    });
  }

  abrirDetalhesReceita(id: string) {
    this.navCtrl.navigateForward(`/detalhes/${id}`);
  }
}
