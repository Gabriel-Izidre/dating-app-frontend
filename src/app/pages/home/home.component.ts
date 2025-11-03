import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { MatchModalComponent } from '../../components/match-modal/match-modal.component';
import { User } from '../../interfaces/user.interface';
import { ActionService } from '../../services/action.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatchModalComponent, BottomNavBarComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private userService = inject(UserService);
  private actionService = inject(ActionService);

  showMatchModal = false;
  matchedUserName = '';
  matchedUserPhoto = '';
  users: User[] = [];
  currentIndex = 0;
  currentPhotoIndex = 0;
  isLoading = false;

  private touchStartX = 0;
  private touchEndX = 0;

  ngOnInit() {
    this.loadUsers();
  }

  get currentProfile(): User | null {
    return this.users[this.currentIndex] || null;
  }

  get allPhotos(): string[] {
    if (!this.currentProfile) return [];
    const photos: string[] = [];
    if (this.currentProfile.profilePhoto) {
      photos.push(this.currentProfile.profilePhoto);
    }
    if (Array.isArray(this.currentProfile.galleryPhotos)) {
      photos.push(...this.currentProfile.galleryPhotos);
    }
    return photos;
  }

  getProfilePhoto(): string {
    const photos = this.allPhotos;
    const photoUrl = photos[this.currentPhotoIndex];

    if (!photoUrl) {
      return '';
    }

    if (photoUrl.startsWith('http')) {
      return photoUrl;
    }

    return `${environment.apiUrl}${photoUrl}`;
  }

  changePhoto(index: number): void {
    this.currentPhotoIndex = index;
  }

  onTouchStart(event: TouchEvent): void {
    this.touchStartX = event.touches[0].clientX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].clientX;
    this.handleSwipe();
  }

  onPhotoClick(event: MouseEvent): void {
    if (this.allPhotos.length <= 1) return;

    const clickX = event.clientX;
    const imageWidth = (event.target as HTMLElement).offsetWidth;
    const clickPosition = clickX / imageWidth;

    if (clickPosition < 0.5) {
      this.previousPhoto();
    } else {
      this.nextPhoto();
    }
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        this.nextPhoto();
      } else {
        this.previousPhoto();
      }
    }
  }

  private nextPhoto(): void {
    if (this.allPhotos.length <= 1) return;

    if (this.currentPhotoIndex < this.allPhotos.length - 1) {
      this.currentPhotoIndex++;
    }
  }

  private previousPhoto(): void {
    if (this.allPhotos.length <= 1) return;

    if (this.currentPhotoIndex > 0) {
      this.currentPhotoIndex--;
    }
  }

  previousProfile(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentPhotoIndex = 0;
    }
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getSuggestedUsers().subscribe({
      next: (response: any) => {
        this.users = response.users || [];
        this.currentIndex = 0;
        this.currentPhotoIndex = 0;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onLike(): void {
    if (!this.currentProfile || this.isLoading) return;
    this.isLoading = true;
    const currentUser = this.currentProfile;
    this.actionService.createAction({
      type: 1, // 1 para like
      targetUser: this.currentProfile._id || this.currentProfile.id
    }).subscribe({
      next: (response) => {
        if (response.match) {
          this.matchedUserName = currentUser.firstname || 'Usuário';
          this.matchedUserPhoto = this.getProfilePhoto();
          this.showMatchModal = true;
        } else {
          this.nextProfile();
        }
      },
      error: () => this.nextProfile()
    });
  }

  onDislike(): void {
    if (!this.currentProfile || this.isLoading) return;
    this.isLoading = true;
    this.actionService.createAction({
      type: 2, // 2 para dislike
      targetUser: this.currentProfile._id || this.currentProfile.id
    }).subscribe({
      next: () => this.nextProfile(),
      error: () => this.nextProfile()
    });
  }

  nextProfile(): void {
    this.currentPhotoIndex = 0;
    this.currentIndex++;
    if (this.currentIndex >= this.users.length) {
      this.currentIndex = 0;
      this.loadUsers();
    } else {
      this.isLoading = false;
    }
  }

  onModalClosed(): void {
    this.showMatchModal = false;
    this.matchedUserName = '';
    this.matchedUserPhoto = '';
    this.nextProfile();
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    const parentElement = event.target.parentElement;
    if (parentElement) {
      parentElement.classList.add('image-error');
    }
  }
}
