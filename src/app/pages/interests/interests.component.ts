import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { Interest } from '../../interfaces/interest.interface';
import { InterestService } from '../../services/interest.service';

@Component({
  selector: 'app-interests',
  standalone: true,
  imports: [CommonModule, NgClass],
  templateUrl: './interests.component.html',
  styleUrl: './interests.component.scss'
})

export class InterestsComponent implements OnInit {
  interests: Interest[] = [];
  selectedInterests: Set<string> = new Set();
  isLoading = false;
  errorMessage = '';

  constructor(private interestService: InterestService) { }

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

  toggleInterest(name: string) {
    if (this.selectedInterests.has(name)) {
      this.selectedInterests.delete(name);
    } else {
      this.selectedInterests.add(name);
    }
  }

  isSelected(name: string): boolean {
    return this.selectedInterests.has(name);
  }

  loadMore() {
    // lógica para carregar mais interesses
  }

  continue() {
    // lógica para continuar
  }
}
