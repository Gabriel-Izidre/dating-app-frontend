import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import { InputTextComponent } from '../../components/inputs/input-text/input-text.component';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, CommonModule, FormsModule, InputTextComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  onEmailChange(value: string) {
    this.email = value;
    this.clearError();
  }

  onPasswordChange(value: string) {
    this.password = value;
    this.clearError();
  }

  clearError() {
    if (this.errorMessage) {
      this.errorMessage = '';
    }
  }

  validateForm(): boolean {
    if (!this.email || !this.password) {
      this.showError('Por favor, preencha todos os campos');
      return false;
    }

    if (!this.isValidEmail(this.email)) {
      this.showError('Por favor, insira um email válido');
      return false;
    }

    if (this.password.length < 6) {
      this.showError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  showError(message: string) {
    this.errorMessage = message;

    setTimeout(() => {
      if (this.errorMessage === message) {
        this.errorMessage = '';
      }
    }, 5000);
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        const token = this.authService.getToken();

        if (token) {
          this.router.navigate(['/home']);
        } else {
          this.showError('Erro ao salvar credenciais. Tente novamente.');
          this.isLoading = false;
        }
      },
      error: (error: HttpErrorResponse) => {
        let mensagemErro = 'Erro ao fazer login. Tente novamente.';

        if (error.status === 0) {
          mensagemErro = 'Erro de conexão. Verifique se o backend está rodando.';
        } else if (error.status === 401) {
          mensagemErro = error.error?.message || 'Email ou senha inválidos';
        } else if (error.status === 404) {
          mensagemErro = error.error?.message || 'Usuário não encontrado';
        } else if (error.status >= 500) {
          mensagemErro = 'Erro no servidor. Tente novamente mais tarde.';
        } else if (error.error?.message) {
          mensagemErro = error.error.message;
        }

        this.showError(mensagemErro);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
