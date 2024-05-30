import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { AnswerOption } from '../../models/answer-option';
import { QuestionnaireService } from '../../services/questionnaire.service';

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
export class QuestionComponent implements OnInit, OnChanges {
  @Input() question!: Question;
  @Input() questionOptions: AnswerOption[] = [];
  @Input() disabledStatus: boolean = true;
  @Input() dependentQuestionValue: any;

  @Output() controlInit = new EventEmitter<FormControl>();

  control!: FormControl;

  constructor(
    private fb: FormBuilder,
    private questionnaireService: QuestionnaireService
  ) {}

  ngOnInit(): void {
    if (this.question) {
      this.control = this.fb.control('');
      if (this.question.answer_type === AnswerType.NUMBER) {
        this.control.addValidators(Validators.pattern(/^\d+$/));
        this.control.patchValue(0);
      }
      if (this.disabledStatus) {
        this.control.disable();
      }

      this.controlInit.emit(this.control);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabledStatus'] && this.control) {
      if (changes['disabledStatus'].currentValue) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
    if (
      changes['dependentQuestionValue'] &&
      this.question &&
      this.dependentQuestionValue?.answer_name
    ) {
      console.log(changes['dependentQuestionValue']);
      this.questionnaireService
        .getAllQuestionOptions(
          this.question.question_id,
          this.dependentQuestionValue?.answer_name
        )
        .subscribe((l) => {
          console.log(l);
          this.questionOptions = l;
        });
    }
  }
  readonly AnswerType = AnswerType;
}
