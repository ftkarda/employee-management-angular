import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-input-component',
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.css',
  standalone: false,
})
export class SelectInputComponent {
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() value: string = "";
  @Input() options: any = [];
  @Input() required: boolean = false;
  @Input() validation: { message: string, error: boolean } = { message: '', error: false }
  @Output() valueChange = new EventEmitter<string>();

  ngOnInit() {
  }

  onValueChange(value: any): void {
    this.valueChange.emit(value);
    this.validation.error = !this.value && this.required;
  }
}
