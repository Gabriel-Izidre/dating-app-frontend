import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { ButtonComponent } from '../../components/button/button.component';
import { GradientButtonComponent } from '../../components/gradient-button/gradient-button.component';
import { Interest } from '../../interfaces/interest.interface';
import { InterestService } from '../../services/interest.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, NgClass, ButtonComponent, GradientButtonComponent],
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})

export class InterestsComponent implements OnInit {
  showAllInterests = false;
  get visibleInterests(): Interest[] {
    if (this.showAllInterests || this.interests.length <= 10) {
      return this.interests;
    }
    return this.interests.slice(0, this.interests.length - 2);
  }
  interests: Interest[] = [];
  selectedInterests: Set<string> = new Set();
  isLoading = false;
  errorMessage = '';

  constructor(
    private interestService: InterestService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = '';
    this.interestService.getInterests().subscribe({
      next: (data: Interest[]) => {
        this.interests = data || [];
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Não foi possível carregar interesses.';
        console.error('InterestService.getInterests error:', err);
      }
    });
  }

  toggleInterest(id: string | undefined) {
    if (!id) return;
    if (this.selectedInterests.has(id)) {
      this.selectedInterests.delete(id);
    } else {
      this.selectedInterests.add(id);
    }
  }

  isSelected(id: string | undefined): boolean {
    if (!id) return false;
    return this.selectedInterests.has(id);
  }

  loadMore() {
    this.showAllInterests = true;
  }

  continue() {
    if (this.selectedInterests.size === 0) {
      this.errorMessage = 'Selecione pelo menos um interesse para continuar.';
      return;
    } else {
      this.errorMessage = '';
    }
    this.isLoading = true;
    this.userService.updateInterests(Array.from(this.selectedInterests)).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Erro ao salvar interesses.';
        console.error('updateInterests error:', err);
      }
    });
  }
}
