import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService, private toastr: ToastrService) { }

  register() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.authService.registerUser(user)
      .then(() => {
        this.toastr.success('Usuário registrado com sucesso.', 'Registro Completo', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });
        this.navCtrl.navigateForward('/login');
      })
      .catch(error => {
        console.error('Error registering user:', error);
        const errorMessage = error.code === 'auth/email-already-in-use'
          ? 'Este email já está em uso. Por favor, use outro email.'
          : 'Erro ao registrar usuário. Por favor, tente novamente.';
        this.toastr.error(errorMessage, 'Erro de Registro', {
          timeOut: 5000,
          progressBar: true,
          closeButton: true
        });
      });
  }
}
