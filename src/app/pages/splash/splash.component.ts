import { Component } from '@angular/core';
import { GradientButtonComponent } from '../../components/gradient-button/gradient-button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [GradientButtonComponent],
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent {

  constructor(private router: Router) { }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
