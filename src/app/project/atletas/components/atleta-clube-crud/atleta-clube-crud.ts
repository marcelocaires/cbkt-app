import { ChangeDetectorRef, Component, inject, input } from '@angular/core';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { ConfirmDialogComponent, ConfirmDialogData } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { PageTitleComponent } from '../../../../shared/components/page-title/page-title.component';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { SharedModule } from '../../../../shared/shared.module';
import { Atleta, AtletaClube, Clube } from '../../../atleta/models/atleta.model';
import { AtletasService } from '../../services/atletas.service';
import { AtletaClubeCrudDlg } from '../atleta-clube-crud-dlg/atleta-clube-crud-dlg';
import { DateUtil } from '../../../../shared/util/date-utils';

@Component({
  selector: 'app-atleta-clube-crud',
  imports: [
    SharedModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    PageTitleComponent
  ],
  templateUrl: './atleta-clube-crud.html',
  styleUrl: './atleta-clube-crud.scss',
})
export class AtletaClubeCrudComponent extends BaseComponent{
  atletasService=inject(AtletasService);
  atleta=input.required<Atleta>();
  cdr=inject(ChangeDetectorRef);
  clubeSelecionado: any;
  clubes:AtletaClube[] =[];

  ngOnInit(){
    this.clubes = this.atleta().clubes;
  }
  selecionarClube($event: Clube|null) {
    this.clubeSelecionado = $event;
  }

  onCreate(){
    const dialog = this.matDialog.open(AtletaClubeCrudDlg, {
      height: 'auto',
      width: '40%',
      disableClose: true
    });

    dialog.afterClosed().subscribe((result:any) => {
      if (result) {
        const form: any = {
          atletaId:this.atleta().id,
          clubeId: result.clube.id,
          dtAdmissao: result.dtAdmissao
        };
        this.atletasService.adicionarAtletaClube(form).subscribe((clubes) => {
          this.msgService.msgSucesso('Clube cadastrado com sucesso!');
          this.updateClubes(clubes);
        });
      }
    });
  }
  onDelete(clube: AtletaClube) {
    const data:ConfirmDialogData={
      title:'Confirma a remoção do clube?',
      confirmMsg:`Deseja realmente remover o atleta ${this.atleta().nomeAtleta} do clube ${clube.clube.nome}?`
    };
    const dialog = this.matDialog.open(ConfirmDialogComponent, {
      height: 'auto',
      width: '40%',
      disableClose: true,
      data: data
    });

    dialog.afterClosed().subscribe((result:boolean) => {
      if (result) {
        const atletaId:any=this.atleta()?this.atleta().id:0;
        this.atletasService.removerAtletaClube(atletaId, clube.id).subscribe((clubes) => {
          this.msgService.msgSucesso('Clube removido com sucesso!');
          this.updateClubes(clubes);
        });
      }
    });
  }
  onTransfer(atletaClubeOrigem: AtletaClube) {
    const dialog = this.matDialog.open(AtletaClubeCrudDlg, {
      height: 'auto',
      width: '40%',
      disableClose: true,
      data:{transferencia:true}
    });

    dialog.afterClosed().subscribe((result:any) => {
      if (result) {
        const dtAdmissaoOrigem=new Date(atletaClubeOrigem.dataAdmissao);
        const dtTransferencia=new Date(result.dtAdmissao);
        if(atletaClubeOrigem.clube.id===result.clube.id){
          this.msgService.msgAlerta('O clube de destino deve ser diferente do clube de origem.');
          return;
        }
        if(DateUtil.compareDates(dtAdmissaoOrigem, dtTransferencia) >= 0){
          this.msgService.msgAlerta('A data de transferência deve ser maior que a data de admissão no clube de origem.');
          return;
        }
        const form: any = {
          atletaId:this.atleta().id,
          atletaClubeOrigemId: atletaClubeOrigem.id,
          clubeDestinoId: result.clube.id,
          dtTransferencia: result.dtAdmissao
        };
        this.atletasService.transferirAtletaClube(form).subscribe((clubes) => {
          this.msgService.msgSucesso('Atleta transferido com sucesso!');
          this.updateClubes(clubes);
        });
      }
    });
  }
  private updateClubes(clubes: AtletaClube[]): void {
    this.clubes = clubes;
    this.cdr.detectChanges();
  }
}
