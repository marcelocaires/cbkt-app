import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaCarteirinhaComponent } from '../../components/atleta-carteirinha/atleta-carteirinha.component';
import { AtletaDadosComponent } from '../../components/atleta-dados/atleta-dados.component';
import { Atleta } from '../../models/atleta.model';
import { AtletaService } from '../../services/atleta.service';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.component.html',
  styleUrls: ['./atleta.component.scss'],
  standalone: true,
  imports: [
    MaterialLayoutModule,
    SharedModule,
    MaterialProgressModule,
    AtletaCarteirinhaComponent,
    MaterialButtonModule,
    AtletaDadosComponent
  ]
})
export class AtletaComponent implements OnInit {
  atleta$: Observable<Atleta> | undefined;
  atletaId: number | null = null;

  constructor(
    private atletaService: AtletaService,
    private route: ActivatedRoute){
    this.atletaId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    if (this.atletaId) {
      this.atleta$ = this.atletaService.getAtletaById(this.atletaId);
    }
  }
}
