import { Component, input, OnInit } from '@angular/core';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta } from '../../models/atleta.model';

@Component({
  selector: 'app-atleta-dados',
  templateUrl: './atleta-dados.component.html',
  styleUrls: ['./atleta-dados.component.scss'],
  standalone: true,
  imports: [MaterialLayoutModule,SharedModule,MaterialButtonModule]
})
export class AtletaDadosComponent implements OnInit {
  atleta=input.required<Atleta>();
  constructor() { }

  ngOnInit() {
  }

}
