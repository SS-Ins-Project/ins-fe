import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableData } from '../models/table-data';
import { QuestionnaireService } from './questionnaire.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  constructor(private http: HttpClient, private questionnaireService: QuestionnaireService) {}

  getTableData(): Observable<TableData[]> {
    const formattedAnswers = this.questionnaireService.getFormattedAnswers();
    return this.http
    .post<any>(
      'https://localhost:443/api/tariff/processAnswers',
      formattedAnswers
    );
  }
}
