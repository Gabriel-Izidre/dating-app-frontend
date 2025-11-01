import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatchModalComponent } from '../../components/match-modal/match-modal.component';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { ActionService } from '../../services/action.service';

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
  users: User[] = [];
  currentIndex = 0;
  currentPhotoIndex = 0;
  isLoading = false;

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
    if (!photoUrl)
      return '';
    else
      return photoUrl;
  }

  changePhoto(index: number): void {
    this.currentPhotoIndex = index;
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
    this.actionService.createAction({
      type: 1, // 1 para like
      targetUser: this.currentProfile._id || this.currentProfile.id
    }).subscribe({
      next: () => this.nextProfile(),
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
    this.nextProfile();
  }
}
