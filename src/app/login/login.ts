import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth';
import { SnackbarService } from '../services/snackbar';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  email = '';
  password = '';
  hidePassword = true;
  isLoading = false;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly snackbarService: SnackbarService
  ) {}

  onSubmit() {
    if (!this.email || !this.password) {
      this.snackbarService.show({
        message: 'Please enter email and password',
        type: 'warning'
      });
      return;
    }

    this.isLoading = true;
    this.authService.login({ email: this.email, password: this.password })
      .subscribe({
        next: (users) => {
          console.log('API Response:', users);
          console.log('Users length:', users?.length);
          this.isLoading = false;
          
          if (users && users.length > 0) {
            this.snackbarService.show({
              message: 'Login successful!',
              type: 'success'
            });
            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 500);
          } else {
            this.snackbarService.show({
              message: 'Invalid email or password',
              type: 'error'
            });
          }
        },
        error: (err) => {
          console.error('API Error:', err);
          this.isLoading = false;
          this.snackbarService.show({
            message: 'Login failed. Please try again.',
            type: 'error'
          });
        }
      });
  }
}
