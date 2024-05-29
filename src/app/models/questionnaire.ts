import { Question } from "./question";

export interface Questionnaire {
  questionnaire_id: number,
  questionnaire_type: string,
  questions?: Question[]
}
