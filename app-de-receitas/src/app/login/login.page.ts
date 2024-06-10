import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService, private toastr: ToastrService) { }

  login() {
    this.authService.loginUser(this.email, this.password)
      .then((userCredential) => {
        console.log('User logged in successfully!', userCredential);
        this.navCtrl.navigateForward(['/home']);
      })
      .catch(error => {
        console.error('Error logging in user:', error);
        this.toastr.error('Email ou senha incorretos. Por favor, verifique suas credenciais e tente novamente.', 'Erro de Login')
      });
  }

  navegarCadastro() {
    this.navCtrl.navigateForward('/cadastro');
  }
}
