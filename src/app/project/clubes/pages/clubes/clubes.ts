import { Component } from '@angular/core';
import { ClubesListComponent } from '../../components/clubes-list/clube-crud.component';

@Component({
  selector: 'app-clubes',
  standalone: true,
  imports: [ClubesListComponent],
  templateUrl: './clubes.html',
  styleUrl: './clubes.scss',
})
export class ClubesComponent {

}
