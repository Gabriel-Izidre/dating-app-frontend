import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-modal.component.html',
  styleUrls: ['./match-modal.component.scss']
})
export class MatchModalComponent {
  @Input() isVisible: boolean = false;
  @Input() userName: string = '';
  @Input() userPhoto: string = '';
  @Input() currentUserPhoto: string = '';
  @Output() closed = new EventEmitter<void>();

  onClose(): void {
    this.isVisible = false;
    this.closed.emit();
  }

  onImageError(event: any): void {
    if (event.target) {
      event.target.src = '/assets/default-avatar.png';
    }
  }

  onStartConversation(): void {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4757;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 10000;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(255, 71, 87, 0.3);
        animation: slideDown 0.3s ease-out;
      ">
        ❌ Erro: Funcionalidade de chat não implementada
      </div>
      <style>
        @keyframes slideDown {
          from { transform: translateX(-50%) translateY(-20px); opacity: 0; }
          to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
      </style>
    `;
    document.body.appendChild(errorDiv);

    setTimeout(() => {
      if (document.body.contains(errorDiv)) {
        document.body.removeChild(errorDiv);
      }
    }, 3000);

    this.onClose();
  }
}
