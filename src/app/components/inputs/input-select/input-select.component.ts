import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectOption } from '../../../interfaces/select.interface';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input-select.component.html',
  styleUrls: ['./input-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputSelectComponent),
      multi: true
    }
  ]
})
export class InputSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() value: string = '';
  @Input() placeholder: string = '';
  @Output() valueChange = new EventEmitter<string>();

  onChangeFn = (_: any) => { };
  onTouchedFn = () => { };

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  onChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    this.valueChange.emit(this.value);
    this.onChangeFn(this.value);
    this.onTouchedFn();
  }
}
