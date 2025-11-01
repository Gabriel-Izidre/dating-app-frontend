import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bottom-nav-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent {
  @Input() activeItem: string = 'home';

  constructor(private router: Router) { }

  onItemClick(item: string): void {
    this.activeItem = item;

    switch (item) {
      case 'home':
        this.router.navigate(['/home']);
        break;
      case 'discover':
        this.router.navigate(['/lists']);
        break;
      case 'matches':
        this.router.navigate(['/matches']);
        break;
      case 'profile':
        this.router.navigate(['/me']);
        break;
    }
  }
}
