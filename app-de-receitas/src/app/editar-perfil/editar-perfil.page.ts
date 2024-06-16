import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  user: any = {};

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

  async salvarDados() {
    try {
      await this.userService.updateUserData(this.user);
      this.navCtrl.navigateBack('/perfil');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
    }
  }

}
