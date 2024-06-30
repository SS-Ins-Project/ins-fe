import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Question } from '../models/question';
import { AnswerOption } from '../models/answer-option';

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
  private formattedAnswers: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  getAllQuestionnaires(): Observable<any> {
    return this.http.get(
      'https://localhost:443/api/questionnaire/getAllQuestionnaires'
    );
  }

  getAllQuestionOptions(
    questionId: number,
    dependentQuestionValue?: any
  ): Observable<any> {
    let params = new HttpParams().set('questionId', questionId);
    if (dependentQuestionValue) {
      params = params.append('dependentQuestionValue', dependentQuestionValue);
    }

    return this.http.get(
      'https://localhost:443/api/options/getOptionsByQuestion',
      { params }
    );
  }

  selectQuestionnaire(questionnaire: Questionnaire): void {
    this.questionnaire = questionnaire;
    this.router.navigate(['questionnaire', questionnaire.questionnaire_id]);
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

  getFormattedAnswers(): any[] {
    return this.formattedAnswers;
  }

  nextPage(): void {
    if (
      this.currentQuestionIndex + this.questionsStep >=
      (this.questionnaire.questions as [])?.length
    ) {
      this.currentQuestionIndex = 0;
      this.currentPage = 1;
      this.router.navigate(['../', 'obsolescence-preview']);
      return;
    }
    this.currentQuestionIndex += this.questionsStep;
    this.currentPage++;
    const displayedQuestions =
      this.questionnaire.questions?.slice(
        this.currentQuestionIndex,
        this.currentQuestionIndex + this.questionsStep
      ) ?? [];
    this.currentQuestions.next(displayedQuestions);
  }

  previousPage(): void {
    if (this.currentQuestionIndex - this.questionsStep < 0) {
      this.currentQuestionIndex = 0;
      this.currentPage = 1;
      this.router.navigate(['../', 'home']);
      return;
    }
    this.currentPage--;
    const displayedQuestions =
      this.questionnaire.questions?.slice(
        this.currentQuestionIndex - this.questionsStep ?? 0,
        this.currentQuestionIndex
      ) ?? [];
    this.currentQuestions.next(displayedQuestions);
    this.currentQuestionIndex -= this.questionsStep;
  }

  getQuestionnaireQuestions(
    questionnaireId: string
  ): Observable<Questionnaire> {
    const params = new HttpParams().set('questionnaireId', questionnaireId);

    return this.http
      .get<Question[]>(
        'https://localhost:443/api/questions/getQuestionsByQuestionnaireWithOptions',
        { params }
      )
      .pipe(
        map((questions) => {
          questions.sort(
            (q1, q2) => q1.question_position - q2.question_position
          );
          this.questionnaire.questions = questions;
          const displayedQuestions = questions.slice(0, this.questionsStep);
          this.currentQuestions.next(displayedQuestions);
          return this.questionnaire;
        })
      );
  }

  submitQuestionnaire(answers: any): void {
    const formattedAnswers: any[] = [];
    Object.entries(answers).map(([key, value]) => {
      if (value || typeof value === 'number') {
        const isValueObject = typeof value === 'object' && !Array.isArray(value) && value !== null;

        formattedAnswers.push({
          answer_name: isValueObject
            ? (value as AnswerOption).answer_name
            : value,
          question_id: key,
        });
      }
    });
    this.formattedAnswers = formattedAnswers;
  }
}
