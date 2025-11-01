import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-date',
  standalone: true,
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateComponent),
      multi: true
    }
  ]
})
export class InputDateComponent implements ControlValueAccessor {
  @Input() placeholder: string = '';
  focused: boolean = false;
  value: string = '';

  onChange = (value: string) => { };
  onTouched = () => { };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }



  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
  }

  onBlur() {
    this.focused = false;
    this.onTouched();
  }

  openCalendar(input: HTMLInputElement) {
    if (input.showPicker) {
      input.showPicker();
    } else {
      input.focus();
    }
  }
}
