import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { TablePreviewComponent } from './pages/table-preview/table-preview.component';
import { questionnaireResolver } from './services/questionnaire.resolver';
import { tablePreviewResolver } from './services/table-preview.resolver';

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'questionnaire/:questionnaireId', component: QuestionnaireComponent, resolve: { questionnaire: questionnaireResolver }
  },
  {
    path: 'obsolescence-preview', component: TablePreviewComponent, resolve: {tableData: tablePreviewResolver}
  }
];
