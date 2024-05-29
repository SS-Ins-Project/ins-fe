import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { AnswerType } from '../models/answer-type.enum';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionnaireService {
  questionnaire: Questionnaire = {} as Questionnaire;

  private currentQuestions = new BehaviorSubject<Question[]>([]);
  currentQuestions$ = this.currentQuestions.asObservable();

  private questionsStep: number = 3;
  private currentQuestionIndex: number = 0;
  private currentPage: number = 1;

  constructor(private http: HttpClient, private router: Router) {}

  getAllQuestionnaires(): Observable<any> {
    return this.http.get('http://localhost:443/api/questionnaire/getAllQuestionnaires');
  }

  selectQuestionnaire(questionnaire: Questionnaire): void {
    this.questionnaire = questionnaire;
    this.router.navigate(['questionnaire', questionnaire.questionnaire_id])
    console.log(questionnaire)
  }

  getCurrentQuestionIndex(): number {
    return this.currentQuestionIndex;
  }

  getCurrentQuestionPage(): number {
    return this.currentPage;
  }

  getCurrentQuestionStep(): number {
    return this.questionsStep;
  }

  nextPage(): void {
    if(this.currentQuestionIndex + this.questionsStep >= (this.questionnaire.questions as [])?.length){
      console.log('SUBMIT');
      return;
    }
    this.currentQuestionIndex+=this.questionsStep;
    this.currentPage++;
    const displayedQuestions = this.questionnaire.questions?.slice(this.currentQuestionIndex, this.currentQuestionIndex + this.questionsStep) ?? [];
    this.currentQuestions.next(displayedQuestions);
  }

  previousPage(): void {
    if(this.currentQuestionIndex-this.questionsStep < 0){
      this.router.navigate(['../','home']);
      return;
    }
    this.currentPage--;
    const displayedQuestions = this.questionnaire.questions?.slice((this.currentQuestionIndex - this.questionsStep ?? 0), this.currentQuestionIndex) ?? [];
    this.currentQuestions.next(displayedQuestions);
    this.currentQuestionIndex-=this.questionsStep;
  }

  getQuestionnaire(): Observable<Questionnaire> {
    return of();
  }

  getQuestionnaireQuestions(questionnaireId: string): Observable<Questionnaire> {
    const params = new HttpParams().set('id', questionnaireId);

    return this.http.get<Question[]>('http://localhost:443/api/questions/getQuestionsByQuestionnaire', {params}).pipe(
      map(questions => {
        this.questionnaire.questions = questions;
        const displayedQuestions = questions.slice(0, this.questionsStep);
        this.currentQuestions.next(displayedQuestions);
        return this.questionnaire;
      })
    );
    // return of({
    //   id: 1,
    //   title: 'Овехтяване на  Каско',
    //   questions: [
    //     {
    //       id: 1,
    //       title: 'Вид на МПС',
    //       hint: 'Въведете видът на вашия автомобил',
    //       required: true,
    //       answerType: AnswerType.TEXT,
    //     },
    //     {
    //       id: 2,
    //       title: 'Възраст на МПС',
    //       hint: 'Въведете годината на производство на вашия автомобил',
    //       required: true,
    //       answerType: AnswerType.NUMBER,
    //     },
    //     {
    //       id: 3,
    //       title: 'Цвят на МПС',
    //       required: false,
    //       answerType: AnswerType.SELECT,
    //       answerOptions: [
    //         {
    //           id: 11,
    //           text: 'Бял',
    //         },
    //         {
    //           id: 12,
    //           text: 'Червен',
    //         },
    //         {
    //           id: 13,
    //           text: 'Зелен',
    //         },
    //       ],
    //     },
    //     {
    //       id: 4,
    //       title: 'МПС притежава ли имобилайзер',
    //       required: true,
    //       answerType: AnswerType.RADIO_SELECT,
    //       answerOptions: [
    //         {
    //           id: 15,
    //           text: 'Да',
    //         },
    //         {
    //           id: 16,
    //           text: 'Не',
    //         },
    //       ],
    //     },
    //   ],
    // }).pipe(
    //   tap(questionnaire => this.questionnaire = questionnaire)
    // );
  }
}
