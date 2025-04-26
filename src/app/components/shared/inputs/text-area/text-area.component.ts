import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'text-area-component',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css'],
  standalone: false
})
export class TextAreaComponent {
  @Input() id: string = "";
  @Input() label: string = "";
  @Input() value: string = "";
  @Input() placeholder: string = "";
  @Input() required: boolean = false;
  @Input() rows: number = 0;
  @Input() validation: { message: string, error: boolean } = { message: '', error: false }

  @Output() valueChange = new EventEmitter<string>();

  onValueChange(value: any): void {
    this.valueChange.emit(value);
  }
}