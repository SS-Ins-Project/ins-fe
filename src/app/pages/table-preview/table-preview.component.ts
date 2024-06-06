import { Component, OnInit } from '@angular/core';
import { TableData } from '../../models/table-data';
import { TableService } from '../../services/table.service';
import { takeUntil, tap } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Destroyable } from '../../utils/destroyable';

@Component({
  selector: 'app-table-preview',
  standalone: true,
  imports: [MatTableModule, CommonModule, RouterModule, MatButtonModule],
  templateUrl: './table-preview.component.html',
  styleUrl: './table-preview.component.scss',
})
export class TablePreviewComponent extends Destroyable implements OnInit {
  tableData: TableData[] = [];
  displayedColumns: string[] = [
    'year',
    'insuranceValue',
    'premium',
    'currency',
  ];

  constructor(private tableService: TableService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.route.data
      .pipe(
        takeUntil(this.destroy$),
        tap((data) => {
          const currentYear = new Date().getFullYear()
          this.tableData = data['tableData'].map((data: any) => {
            return {
              ...data,
              year: currentYear + data.year
            }
          });
        })
      )
      .subscribe();
  }
}
