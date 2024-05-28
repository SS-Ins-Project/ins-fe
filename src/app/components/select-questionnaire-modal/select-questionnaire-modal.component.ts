import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { tap } from 'rxjs';
import { MatRadioModule } from '@angular/material/radio';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-select-questionnaire-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatRadioModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './select-questionnaire-modal.component.html',
  styleUrl: './select-questionnaire-modal.component.scss',
})
export class SelectQuestionnaireModalComponent implements OnInit {
  questionnaires: any[] = [];
  selectedQuestionnaireGroup = this.fb.group({
    selectedQuestionnaire: this.fb.control<null | number>(null, Validators.required)
  });

  get selectedQuestionnaireControl(): FormControl<null | number> {
    return this.selectedQuestionnaireGroup.get('selectedQuestionnaire') as FormControl<null | number>;
  }

  constructor(
    private questionnaireService: QuestionnaireService,
    private dialogRef: MatDialogRef<SelectQuestionnaireModalComponent>,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.questionnaireService
      .getAllQuestionnaires()
      .pipe(
        tap((questionnaires) => this.questionnaires = questionnaires)
      )
      .subscribe();
  }

  onCalculate(): void {
    this.selectedQuestionnaireGroup.markAllAsTouched();
    console.log(this.selectedQuestionnaireGroup.valid, this.selectedQuestionnaireGroup.value)
    if(this.selectedQuestionnaireGroup.valid) {
      this.dialogRef.close(this.selectedQuestionnaireControl.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
