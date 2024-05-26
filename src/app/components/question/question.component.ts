import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Question } from '../../models/question';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { AnswerType } from '../../models/answer-type.enum';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatSelectModule,
  ],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
})
export class QuestionComponent implements OnInit {
  @Input() question!: Question;
  @Output() controlInit = new EventEmitter<FormControl>();

  control!: FormControl;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.question) {
      this.control = this.fb.control('');
      if (this.question.answerType === AnswerType.NUMBER) {
        this.control.addValidators(Validators.pattern(/^\d+$/));
        this.control.patchValue(0);
      } else if (
        this.question.answerType === AnswerType.RADIO_SELECT &&
        this.question?.answerOptions?.length
      ) {
        this.control.patchValue(this.question.answerOptions[0]);
      }
      this.controlInit.emit(this.control);
    }
  }

  readonly AnswerType = AnswerType;
}
