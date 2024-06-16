import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isLoginPage: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoginPage = event.url === '/login' || event.url === '/cadastro';
      }
    });
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      // Lógica adicional para lidar com o erro, se necessário
    }
  }
}
