import { Component, OnInit } from '@angular/core';
import { TableData } from '../../models/table-data';
import { TableService } from '../../services/table.service';
import { take, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-table-preview',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule],
  templateUrl: './table-preview.component.html',
  styleUrl: './table-preview.component.scss',
})
export class TablePreviewComponent implements OnInit {
  tableData: TableData[] = [];
  displayedColumns: string[] = [
    'year',
    'insuranceValue',
    'premium',
    'currency',
  ];

  constructor(private tableService: TableService) {}

  ngOnInit(): void {
    this.tableService
      .getTableData()
      .pipe(
        take(1),
        tap((tableData) => (this.tableData = tableData))
      )
      .subscribe();
  }
}
