import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.scss'
})
export class InputTextComponent {
  @Input() type: string = 'text';
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  focused: boolean = false;

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
  }
}
