import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {
  user: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadUserProfile();
  }

  async loadUserProfile() {
    const currentUser = await this.authService.getCurrentUser();
    if(currentUser) {
      this.user = await this.userService.getUserData(currentUser.uid);
    }
  }

  editarPerfil() {
    this.navCtrl.navigateForward('editar-perfil');
  }

}
