import { Component, OnInit } from '@angular/core';
import { QuestionnaireService } from '../../services/questionnaire.service';
import { Questionnaire } from '../../models/questionnaire';
import { Destroyable } from '../../utils/destroyable';
import { takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { QuestionComponent } from '../../components/question/question.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-questionnaire',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatProgressBarModule, MatButtonModule, QuestionComponent],
  templateUrl: './questionnaire.component.html',
  styleUrl: './questionnaire.component.scss'
})
export class QuestionnaireComponent extends Destroyable implements OnInit {
  questionnaire!: Questionnaire;
  currentQuestionIndex: number = 1;

  constructor(private questionnaireService: QuestionnaireService) {
    super();
  }

  ngOnInit(): void {
    this.questionnaireService.getQuestionnaire().pipe(
      takeUntil(this.destroy$),
      tap(questionnaire => {
        this.questionnaire = questionnaire;
        console.log(questionnaire)
      })
    ).subscribe();
    this.currentQuestionIndex = this.questionnaireService.getCurrentQuestionIndex();
  }

  onNextPage(): void {
    console.log('NEXT');
    this.questionnaireService.nextPage();
    this.currentQuestionIndex = this.questionnaireService.getCurrentQuestionIndex();
  }


}
