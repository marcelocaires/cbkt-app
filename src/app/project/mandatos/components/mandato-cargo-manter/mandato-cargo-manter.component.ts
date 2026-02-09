import { MandatoCargoRequest } from './../../services/mandato.service';
import { Component, effect, inject, input, output } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { BaseComponent } from '../../../../shared/components/base/base.component';
import { MaterialFormModule } from '../../../../shared/material/material-form.module';
import { SharedModule } from '../../../../shared/shared.module';
import { ConsultaPessoaComponent } from '../../../pessoas/components/consulta-pessoa/consulta-pessoa.component';
import { MandatoCargosListComponent } from '../mandato-cargos-list/mandato-cargos-list.component';
import { Cargo, Mandato, MandatoCargo, MandatoParametro, MandatoService } from '../../services/mandato.service';
import { MaterialLayoutModule } from '../../../../shared/material/material-layout.module';
import { MaterialButtonModule } from '../../../../shared/material/material-button.module';

@Component({
  selector: 'app-mandato-cargo-manter',
  templateUrl: './mandato-cargo-manter.component.html',
  styleUrls: ['./mandato-cargo-manter.component.scss'],
  standalone: true,
  imports: [
    SharedModule,
    MaterialFormModule,
    MaterialLayoutModule,
    MaterialButtonModule,
    ConsultaPessoaComponent,
    MandatoCargosListComponent
  ]
})
export class MandatoCargoManterComponent extends BaseComponent{
  mandatoService=inject(MandatoService);
  mandato=input<Mandato | null>();
  value=output<any>();
  form: FormGroup={} as FormGroup;
  isInsert:boolean=false;
  cargosInseridos:MandatoCargo[]=[];
  isNew:boolean=false;
  isUpdate:boolean=false;

  tiposVinculo$:Observable<MandatoParametro[]> = new Observable<MandatoParametro[]>();
  tiposOcupacao$:Observable<MandatoParametro[]> = new Observable<MandatoParametro[]>();
  cargos$:Observable<Cargo[]> = new Observable<Cargo[]>();

  constructor() {
    super();
    this.form = this.formBuilder.group({
      pessoa: [null,[Validators.required]],
      cargo: [null,[Validators.required]],
      tipoVinculo: [null,[Validators.required]],
      dataInicio: [null],
      dataFim: [null],
      ativo:[true],
      observacao: ['']
    });
    this.tiposVinculo$ = this.mandatoService.getCargoTiposVinculo();
    this.tiposOcupacao$ = this.mandatoService.getCargoTiposOcupacao();
    this.cargos$ = this.mandatoService.obterCargos();
  }

  ngOnInit(){
    if (this.mandato()!=null){
      this.isUpdate=true;
      this.cargosInseridos=this.mandato()!.cargos || [];
    }else{
      this.isNew=true;
    }
  }

  insert(){
    if(this.form.invalid){
      return;
    }
    if(this.isUpdate){
      const cargoAdd:MandatoCargoRequest={
        pessoa: this.form.value.pessoa,
        cargo: this.form.value.cargo,
        tipoVinculo: this.form.value.tipoVinculo,
        dataInicio: this.form.value.dataInicio,
        dataFim: this.form.value.dataFim,
        ativo: this.form.value.ativo,
        observacao: this.form.value.observacao
      };
      this.mandatoService.adicionarCargoMandato(this.mandato()!.id!,cargoAdd).subscribe({
        next: (cargo)=>{
          this.cargosInseridos.push(cargo);
          this.value.emit(this.cargosInseridos);
          this.cancelar();
        },
        error: (err)=>{
          this.msgService.msgErro('Erro ao adicionar cargo ao mandato: '+err.message);
        }
      });

    }else{
      if (this.form.valid){
        this.cargosInseridos.push(this.form.value);
        this.value.emit(this.cargosInseridos);
        this.cancelar();
      }
    }
  }

  cancelar(){
    this.isInsert=false;
    this.form.reset();
  }

  atualizarPessoa(pessoa:any){
    this.form.patchValue({
      pessoa: pessoa
    });
  }
}
