import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { TableService } from './table.service';
import { map } from 'rxjs';

export const tablePreviewResolver: ResolveFn<any> = (route, state) => {
  return inject(TableService).getTableData().pipe(map(result => result ?? false));
};
