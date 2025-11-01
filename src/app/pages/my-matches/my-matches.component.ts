import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BottomNavBarComponent } from '../../components/bottom-nav-bar/bottom-nav-bar.component';
import { MatchService } from '../../services/match.service';
import { UserService } from '../../services/user.service';
import { UserMatch } from '../../interfaces/match.interface';

@Component({
  selector: 'app-my-matches',
  standalone: true,
  imports: [CommonModule, BottomNavBarComponent],
  templateUrl: './my-matches.component.html',
  styleUrls: ['./my-matches.component.scss']
})
export class MyMatchesComponent implements OnInit {
  private matchService = inject(MatchService);
  private userService = inject(UserService);
  matches: UserMatch[] = [];
  isLoading = false;
  userId: string = '';

  ngOnInit() {
    this.isLoading = true;
    this.userService.getMe().subscribe({
      next: (me: any) => {
        this.userId = me._id || me.id;
        this.loadMatches();
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadMatches() {
    this.matchService.getMatches(this.userId).subscribe({
      next: (response: any) => {
        this.matches = Array.isArray(response) ? response : (response.matches || []);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
