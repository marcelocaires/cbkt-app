import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { AtletaGraduacoesComponent } from '../../../atleta/components/atleta-graduacoes/atleta-graduacoes.component';
import { Atleta, AtletaGraduacao } from '../../../atleta/models/atleta.model';
import { AtletasService } from '../../services/atletas.service';
import { AtletaGraduacaoCrudDlg } from '../atleta-graduacao-crud-dlg/atleta-graduacao-crud-dlg';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-atleta-graduacao-crud',
  standalone: true,
  imports: [
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    AtletaGraduacoesComponent
  ],
  templateUrl: './atleta-graduacao-crud.html',
  styleUrl: './atleta-graduacao-crud.scss',
})
export class AtletaGraduacaoCrudComponent extends BaseComponent{
  atletasService=inject(AtletasService);
  atleta=input.required<Atleta>();
  cdr=inject(ChangeDetectorRef);
  graduacoes:AtletaGraduacao[]=[];

  ngOnInit(): void {
    this.updateGraduacoes(this.atleta().graduacoes);
  }

  onCreate() {
    const dialog = this.matDialog.open(AtletaGraduacaoCrudDlg, {
      height: 'auto',
      width: '40%',
      disableClose: true
    });

    dialog.afterClosed().subscribe((result:any) => {
      if (result) {
        const form: any = {
          atletaId:this.atleta().id,
          graduacaoId: result.graduacao.id,
          dtExame: result.dtExame,
          notaExame: result.nota
        };
        this.atletasService.adicionarGraduacaoAtleta(form).subscribe({
          next: (graduacoes) => {
            this.msgService.msgSucesso('Graduação cadastrada com sucesso!');
            this.updateGraduacoes(graduacoes);
          },
          error: (err) => {
            this.msgService.msgErro('Ocorreu um erro ao cadastrar graduação: ' + err.message);
          }
        });
      }
    });
  }

  onDelete(graduacao: AtletaGraduacao) {
    const data:ConfirmDialogData={
      title:'Confirma a remoção da graduação?',
      confirmMsg:`Deseja realmente remover a graduação ${graduacao.graduacao.descricaoGraduacao} do atleta ${this.atleta().nomeAtleta}?`
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '40%',
      disableClose: true,
      data: data
    });

    dialog.afterClosed().subscribe((result:boolean) => {
      if (result) {
        this.atletasService.removerGraduacaoAtleta(graduacao.id).subscribe({
          next: (graduacoes) => {
            this.msgService.msgSucesso('Graduação removida com sucesso!');
            this.updateGraduacoes(graduacoes);
          },
          error: (err) => {
            this.msgService.msgErro('Ocorreu um erro ao remover graduação: ' + err.message);
          }
        });
      }
    });
  }

  updateGraduacoes(graduacoes: AtletaGraduacao[]):void{
    this.graduacoes = graduacoes;
    this.cdr.detectChanges();
  }
}
