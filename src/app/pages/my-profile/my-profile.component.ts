import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

interface PhotoPreview {
  file: File;
  preview: string;
}

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BottomNavBarComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private userService: UserService, private authService: AuthService) { }

  selectedPhotos: PhotoPreview[] = [];
  isUploading: boolean = false;
  message: string = '';
  messageType: 'success' | 'error' | '' = '';

  get emptySlots(): number[] {
    const minSlots = 3;
    const currentSlots = Math.max(minSlots, 6 - this.selectedPhotos.length);
    return Array(currentSlots).fill(0);
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);

      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.selectedPhotos.push({
            file: file,
            preview: e.target?.result as string
          });
        };
        reader.readAsDataURL(file);
      });

      input.value = '';
    }
  }

  removePhoto(index: number): void {
    this.selectedPhotos.splice(index, 1);
  }

  clearAllPhotos(): void {
    this.selectedPhotos = [];
    this.clearMessage();
  }

  clearMessage(): void {
    this.message = '';
    this.messageType = '';
  }

  showMessage(text: string, type: 'success' | 'error'): void {
    this.message = text;
    this.messageType = type;

    setTimeout(() => {
      this.clearMessage();
    }, 5000);
  }

  uploadPhotos(): void {
    if (this.selectedPhotos.length === 0) return;

    const currentUser = this.authService.currentUserValue;
    if (!currentUser || !currentUser.id) {
      this.showMessage('Erro: Usuário não autenticado. Faça login novamente.', 'error');
      return;
    }

    this.isUploading = true;
    this.clearMessage(); // Limpar mensagens anteriores
    const files = this.selectedPhotos.map(photo => photo.file);

    this.userService.uploadUserPhotos(currentUser.id, files).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.clearAllPhotos();
        this.showMessage(`${files.length} foto(s) enviada(s) com sucesso!`, 'success');
      },
      error: (error) => {
        this.isUploading = false;
        const errorMessage = error.error?.message || 'Erro ao enviar fotos. Tente novamente.';
        this.showMessage(errorMessage, 'error');
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
