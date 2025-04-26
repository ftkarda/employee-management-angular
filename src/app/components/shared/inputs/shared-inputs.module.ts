import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextInputComponent } from './text-input/text-input.component';
import { TextAreaComponent } from './text-area/text-area.component';
import { SelectInputComponent } from './select-input/select-input.component';
import { DateInputComponent } from './date-input/date-input.component';
import { InputNumberComponent } from './input-number/input-number.component';

@NgModule({
  declarations: [
    TextInputComponent,
    TextAreaComponent,
    SelectInputComponent,
    DateInputComponent,
    InputNumberComponent
  ],
  imports: [CommonModule, FormsModule],
  exports: [
    TextInputComponent,
    TextAreaComponent,
    SelectInputComponent,
    DateInputComponent,
    InputNumberComponent
  ]
})
export class SharedInputsModule { }