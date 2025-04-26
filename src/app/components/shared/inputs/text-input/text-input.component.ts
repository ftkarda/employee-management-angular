import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';

@Component({
  selector: 'text-input-component',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css'],
  standalone: false
})
export class TextInputComponent {
  @Input() label: string = '';
  @Input() id: string = '';
  @Input() type: string = 'text';
  @Input() model: string = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() value: string = '';
  @Input() min: number = 0;
  @Input() max: number = 0;
  @Input() validation: { message: string, error: boolean } = { message: '', error: false };

  @Output() valueChange = new EventEmitter<any>();

  onValueChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.valueChange.emit(this.value);
    this.validation.error = !this.value && this.required;
    if (this.id === 'email') {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.value)) {
        this.validation.error = true;
        this.validation.message = 'Please enter a valid email address.';
      } else {
        this.validation.error = false;
        this.validation.message = '';
      }
    }
  }
}