import { ResolveFn } from '@angular/router';
import { QuestionnaireService } from './questionnaire.service';
import { inject } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';

export const questionnaireResolver: ResolveFn<Questionnaire | boolean> = (route, state) => {
  const questionnaireId = route.paramMap.get('questionnaireId');

  return questionnaireId ? inject(QuestionnaireService).getQuestionnaireQuestions(questionnaireId) : false;
};
