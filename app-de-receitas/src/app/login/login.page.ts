import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private authService: AuthService) { }

  login() {
    this.authService.loginUser(this.email, this.password)
      .then((userCredential) => {
        console.log('User logged in successfully!', userCredential);
        this.navCtrl.navigateForward(['/home']);
      })
      .catch(error => console.error('Error logging in user:', error));
  }

  sucessoLogin() {
    this.navCtrl.navigateForward('/home');
  }

  navegarCadastro() {
    this.navCtrl.navigateForward('/cadastro');
  }
}
