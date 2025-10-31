import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from '../../interfaces/register-request.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private router = inject(Router);
  registerForm: FormGroup;
  photoFile: File | null = null;
  loading = false;
  errorMsg = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      dob: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
      gender: ['', [Validators.required]],
      preference: ['', [Validators.required]]
    });
  }

  photoPreviewUrl: string | null = null;

  onPhotoChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.photoFile = file;
      this.photoPreviewUrl = URL.createObjectURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid || !this.photoFile) {
      this.errorMsg = 'Preencha todos os campos e selecione uma foto.';
      return;
    }
    this.loading = true;
    const userData = this.registerForm.value;
    this.authService.registerWithPhoto(userData as RegisterRequest, this.photoFile).subscribe({
      next: () => {
        this.loading = false;
        // Redirecionar ou mostrar sucesso
        this.router.navigate(['/interests']);
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = err.error?.mensagem || 'Erro ao registrar.';
      }
    });
  }
}
