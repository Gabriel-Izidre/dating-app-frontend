import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from '../../../interfaces/select.interface';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss']
})
export class InputSelectComponent {
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.valueChange.emit(this.value);
  }
}
