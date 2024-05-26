import { AnswerOption } from "./answer-option";
import { AnswerType } from "./answer-type.enum";

export interface Question {
  id: string,
  title: string,
  hint?: string,
  required: boolean,
  value?: any,
  answerType: AnswerType,
  answerOptions?: AnswerOption[]
}
