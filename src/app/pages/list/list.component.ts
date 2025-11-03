import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { User } from '../../interfaces/user.interface';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, BottomNavBarComponent],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  private userService = inject(UserService);
  users: User[] = [];
  isLoading = false;
  activeTab: 'all' | 'online' | 'new' | 'liked' = 'all';

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.isLoading = true;
    this.userService.getSuggestedUsers().subscribe({
      next: (response: any) => {
        this.users = response.users || [];
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  getProfilePhotoUrl(photoUrl: string): string {
    if (!photoUrl) return '';

    if (photoUrl.startsWith('http')) {
      return photoUrl;
    }

    return `${environment.apiUrl}${photoUrl}`;
  }

  getTotalPhotos(user: User): number {
    let count = 0;
    if (user.profilePhoto) count++;
    if (user.galleryPhotos && user.galleryPhotos.length) {
      count += user.galleryPhotos.length;
    }
    return count;
  }

  onImageError(event: any): void {
    event.target.style.display = 'none';
    const parentElement = event.target.parentElement;
    if (parentElement) {
      parentElement.classList.add('image-error');
    }
  }

  setActiveTab(tab: 'all' | 'online' | 'new' | 'liked'): void {
    this.activeTab = tab;
    // Por enquanto mostra os mesmos registros para todas as tabs
  }
}
