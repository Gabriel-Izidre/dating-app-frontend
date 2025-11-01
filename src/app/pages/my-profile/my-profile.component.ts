import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { ButtonComponent } from '../../components/button/button.component';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [ButtonComponent, BottomNavBarComponent],
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {
  constructor(private userService: UserService, private authService: AuthService) { }

  images: File[] = [];
  userId: string = '';
  isUploading: boolean = false;

  onImagesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.images = Array.from(input.files);
      this.uploadImages();
    }
  }

  uploadImages(): void {
    if (!this.userId || this.images.length === 0) return;
    this.isUploading = true;
    this.userService.uploadUserPhotos(this.userId, this.images).subscribe({
      next: (res: any) => {
        console.log('Imagens enviadas com sucesso', res);
        this.isUploading = false;
      },
      error: (err: any) => {
        console.error('Erro ao enviar imagens', err);
        this.isUploading = false;
      }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
