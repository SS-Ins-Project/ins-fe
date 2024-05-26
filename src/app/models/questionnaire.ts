import { Question } from "./question";

export interface Questionnaire {
  id: string,
  title: string,
  questions: Question[]
}
