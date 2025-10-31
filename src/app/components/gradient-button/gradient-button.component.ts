import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NgIf, NgStyle } from '@angular/common';

@Component({
  selector: 'app-gradient-button',
  standalone: true,
  imports: [NgIf, NgStyle],
  template: `
    <button class="gradient-btn" [ngStyle]="{ fontSize: fontSize }" (click)="handleClick()">
      <ng-content></ng-content>
      <span *ngIf="icon" class="icon">{{ icon }}</span>
    </button>
  `,
  styleUrls: ['./gradient-button.component.scss']
})
export class GradientButtonComponent {
  @Input() fontSize: string = '18px';
  @Input() icon?: string;
  @Output() clicked = new EventEmitter<void>();

  handleClick() {
    this.clicked.emit();
  }
}
