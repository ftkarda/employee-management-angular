import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'input-number-component',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.css'],
  standalone: false
})
export class InputNumberComponent {
  @Input() id: string = '';
  @Input() label: string = '';
  @Input() type: string = 'number';
  @Input() placeholder: string = '';
  @Input() value: number | null = null;
  @Input() required: boolean = false;
  @Input() min?: number;
  @Input() max?: number;
  @Input() validation: { message: string, error: boolean } = { message: '', error: false };
  @Output() valueChange = new EventEmitter<number>();

  onValueChange(value: any): void {

    const parsedValue = Number(value);
    this.value = parsedValue;
    this.valueChange.emit(parsedValue);

    const isEmpty = this.required && (value === null || value === undefined || value === '');

    this.validation.error = isEmpty;
  }
}