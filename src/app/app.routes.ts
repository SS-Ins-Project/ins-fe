import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuestionnaireComponent } from './pages/questionnaire/questionnaire.component';
import { TablePreviewComponent } from './pages/table-preview/table-preview.component';

export const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'questionnaire', component: QuestionnaireComponent
  },
  {
    path: 'obsolescence-preview', component: TablePreviewComponent
  }
];
