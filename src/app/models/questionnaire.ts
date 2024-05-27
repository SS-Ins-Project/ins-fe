import { Question } from "./question";

export interface Questionnaire {
  id: number,
  title: string,
  questions: Question[]
}
