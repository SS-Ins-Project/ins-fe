import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { AnswerType } from '../models/answer-type.enum';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  questionnaire!: Questionnaire;
  private currentQuestionIndex: number = 1;

  constructor() {}

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  nextPage(): void {
    this.currentQuestionIndex++;
  }

  getQuestionnaire(): Observable<Questionnaire> {
    return of({
      id: 1,
      title: 'Овехтяване на  Каско',
      questions: [
        {
          id: 1,
          title: 'Вид на МПС',
          hint: 'Въведете видът на вашия автомобил',
          required: true,
          answerType: AnswerType.TEXT,
        },
        {
          id: 2,
          title: 'Възраст на МПС',
          hint: 'Въведете годината на производство на вашия автомобил',
          required: true,
          answerType: AnswerType.NUMBER,
        },
        {
          id: 3,
          title: 'Цвят на МПС',
          required: false,
          answerType: AnswerType.SELECT,
          answerOptions: [
            {
              id: 11,
              text: 'Бял',
            },
            {
              id: 12,
              text: 'Червен',
            },
            {
              id: 13,
              text: 'Зелен',
            },
          ],
        },
        {
          id: 4,
          title: 'МПС притежава ли имобилайзер',
          required: true,
          answerType: AnswerType.RADIO_SELECT,
          answerOptions: [
            {
              id: 15,
              text: 'Да',
            },
            {
              id: 16,
              text: 'Не',
            },
          ],
        },
      ],
    }).pipe(
      tap(questionnaire => this.questionnaire = questionnaire)
    );
  }
}
