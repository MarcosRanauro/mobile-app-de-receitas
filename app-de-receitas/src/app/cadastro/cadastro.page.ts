import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  register() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.authService.registerUser(user)
      .then(() => {
        console.log('User registered successfully!');
        this.router.navigate(['/login']);
      })
      .catch(error => console.error('Error registering user:', error));
  }

  navegarLogin() {
    this.router.navigate(['/login']);
  }
}
