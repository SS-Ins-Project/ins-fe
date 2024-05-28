import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { SelectQuestionnaireModalComponent } from '../../components/select-questionnaire-modal/select-questionnaire-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private dialog: MatDialog) {}

  openModal(): void {
    this.dialog.open(SelectQuestionnaireModalComponent)
  }

}
