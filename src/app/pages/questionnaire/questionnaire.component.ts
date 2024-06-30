import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire';
import { Destroyable } from '../../utils/destroyable';
import { takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { QuestionComponent } from '../../components/question/question.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Question } from '../../models/question';
import { AnswerOption } from '../../models/answer-option';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatProgressBarModule,
    MatButtonModule,
    QuestionComponent,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss',
})
export class QuestionnaireComponent extends Destroyable implements OnInit {
  questionnaire!: Questionnaire;
  questionnaireGroup = this.fb.group({});
  currentQuestions: Question[] = [];
  questionsStep!: number;
  allPagesCount: number = 1;
  currentPage: number = 1;

  constructor(
    private questionnaireService: QuestionnaireService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.currentPage = this.questionnaireService.getCurrentQuestionPage();
    this.questionsStep = this.questionnaireService.getCurrentQuestionStep();

    this.route.data
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          this.questionnaire = data['questionnaire'];

          const questionLength = this.questionnaire.questions?.length ?? 0;
          this.allPagesCount = questionLength ? Math.ceil(questionLength / this.questionsStep) : 1;
        })
      )
      .subscribe();

    this.questionnaireService.currentQuestions$.subscribe(questions => this.currentQuestions = questions);
  }

  onNextPage(): void {
    this.questionnaireGroup.markAllAsTouched();

    if(this.questionnaireGroup.invalid) {
      return;
    }
    if(this.currentPage + 1 > this.allPagesCount){
      this.questionnaireService.submitQuestionnaire(this.questionnaireGroup.value);
    }
    this.questionnaireService.nextPage();
    this.currentPage =
      this.questionnaireService.getCurrentQuestionPage();
  }

  onPreviousPage(): void {
    this.questionnaireService.previousPage();
    this.currentPage =
      this.questionnaireService.getCurrentQuestionPage();
  }

  getQuestionOptions(question: Question): AnswerOption[] {
    return question?.options ?? [];
  }

  getQuestionValue(questionId: number | undefined): any {
    if(!questionId) {
      return null;
    }

    const value: any = this.questionnaireGroup.value;
    return value[(questionId.toString())];
  }

  isQuestionDisable(question: Question): boolean {
    const value: any = this.questionnaireGroup.value;
    let disabledState = false;

    if(question.dependent_question && !value[(question.dependent_question?.toString() as string)]) {
      disabledState = true;
    }

    return disabledState;
  }

  controlInit(questionControl: FormControl, id: number): void {
    this.questionnaireGroup.addControl(id.toString(), questionControl);
  }
}
