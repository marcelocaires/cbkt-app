import { Component, OnInit } from '@angular/core';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaService } from '../../services/atleta.service';
import { ActivatedRoute } from '@angular/router';
import { Atleta } from '../../models/atleta.model';
import { Observable } from 'rxjs';
import { MaterialProgressModule } from '../../../../shared/material/material-progress.module';
import { AtletaCarteirinhaComponent } from '../../components/atleta-carteirinha/atleta-carteirinha.component';

@Component({
  selector: 'app-atleta',
  templateUrl: './atleta.component.html',
  styleUrls: ['./atleta.component.scss'],
  standalone: true,
  imports: [MaterialLayoutModule,SharedModule,MaterialProgressModule,AtletaCarteirinhaComponent]
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
