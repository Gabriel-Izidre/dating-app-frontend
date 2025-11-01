import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';


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
}
