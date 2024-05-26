import { Injectable } from '@angular/core';
import { Questionnaire } from '../models/questionnaire';
import { AnswerType } from '../models/answer-type.enum';
import { Observable, of, tap } from 'rxjs';
import { TableData } from '../models/table-data';

@Injectable({
  providedIn: 'root',
})
export class TableService {

  constructor() {}

  getTableData(): Observable<TableData[]> {
    return of([
      {
        id: '1',
        year: '2024',
        insuranceValue: 50000,
        premium: 1500,
        currency: 'BGN'
      },
      {
        id: '2',
        year: '2025',
        insuranceValue: 40000,
        premium: 1400,
        currency: 'BGN'
      },
      {
        id: '3',
        year: '2026',
        insuranceValue: 32500,
        premium: 1320,
        currency: 'BGN'
      },
      {
        id: '4',
        year: '2027',
        insuranceValue: 27500,
        premium: 1300,
        currency: 'BGN'
      },
      {
        id: '5',
        year: '2028',
        insuranceValue: 25000,
        premium: 1250,
        currency: 'BGN'
      }
    ])
  }
}
