import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService }  from '../../../layout/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:['./login.scss'],
    imports: [CommonModule,FormsModule]
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        this.router.navigate(['/doktor']);  
      },
      error: (err) => {
        this.error = 'Pogrešno korisničko ime ili lozinka!';
      }
    });
  }
}