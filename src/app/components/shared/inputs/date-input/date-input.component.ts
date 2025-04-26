import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'date-input-component',
  templateUrl: './date-input.component.html',
  styleUrl: './date-input.component.css',
  standalone: false
})
export class DateInputComponent {
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() value: string = "";
  @Input() required: boolean = false;
  @Input() validation: { message: string, error: boolean } = { message: '', error: false };
  @Output() valueChange = new EventEmitter<string>();
  today: string = '';

  ngOnInit(): void {
    this.maxDateisToday()
  }

  onValueChange(value: any): void {
    this.valueChange.emit(value);
  }

  maxDateisToday() {
    this.today = new Date().toLocaleDateString('en-CA');
  }
}
