import { AnswerOption } from "./answer-option";
import { AnswerType } from "./answer-type.enum";

export interface Question {
  question_id: number,
  question_position: number,
  question_name: string,
  question_hint?: string,
  question_required: 'Y' | 'N',
  value?: any,
  answer_type: AnswerType,
  // answerOptions?: AnswerOption[],
  dependent_question?: number,
  questionnaire_id: number
}
