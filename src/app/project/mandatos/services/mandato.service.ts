import { Observable } from 'rxjs';
import { CrudService, ResourceModel } from '../../../shared/services/crud.service';
import { Injectable } from '@angular/core';
import { environment as env } from '../../../../environments/environment';
import { Pessoa } from '../../pessoas/services/pessoa.service';

export interface Cargo {
  id: number;
  nome: string;
  hierarquia: number;
  requerSuplente: boolean;
  ativo: boolean;
}

export interface MandatoCargo {
  id?: number;
  pessoa: Pessoa;
  tipoOcupacao: string;
  tipoVinculo: string;
  dataInicio: string;
  dataFim?: string;
  ativo: boolean;
  substituiuId?: number;
  motivoSaida?: string;
  observacao?: string;
  cargo?: Cargo;
}

export interface Mandato extends ResourceModel<Mandato> {
  id?: number;
  tipoEntidade: string;
  entidadeId: number;
  dataInicio: string;
  dataFim?: string;
  ativo: boolean;
  descricao: string;
  documentoPath?: string;
  cargos?: MandatoCargo[];
  criadoEm?: string;
  atualizadoEm?: string;
  criadoPorCpf?: string;
  criadoPorNome?: string;
  versao?: number;
}

export interface MandatoRequest {
  tipoEntidade: string;
  entidadeId: number;
  dataInicio: string;
  dataFim?: string;
  descricao: string;
  documentoPath?: string;
}

export interface MandatoCargoRequest {
  pessoa: Pessoa;
  cargo:Cargo;
  tipoVinculo: string;
  dataInicio?: string;
  dataFim?: string;
  ativo?: boolean;
  substituiuId?: number;
  motivoSaida?: string;
  observacao?: string;
}

export interface MandatoComCargosRequest {
  tipoEntidade: string;
  entidadeId: number;
  dataInicio: string;
  dataFim?: string;
  descricao: string;
  cargos?: MandatoCargoRequest[];
}

export interface MandatoParametro{
  codigo:string;
  descricao:string;
}

@Injectable({
  providedIn: 'root',
})
export class MandatoService extends CrudService<Mandato> {

  constructor() {
    const apiUrl = `${env.apiCadastroUrl}/mandato`;
    super(
      apiUrl,
      apiUrl,
      'Mandato',
      'Mandatos');
  }

  /**
   * Lista mandatos por tipo de entidade e ID
   */
  listarPorEntidade(tipoEntidade: string, entidadeId: number): Observable<Mandato[]> {
    return this.http.get<Mandato[]>(`${this.urlPath}`, {
      params: {
        tipoEntidade,
        entidadeId: entidadeId.toString()
      }
    });
  }

  /**
   * Lista todos os cargos disponíveis
   */
  obterCargos(): Observable<Cargo[]> {
    return this.http.get<Cargo[]>(`${this.urlPath}/cargos`);
  }

  /**
   * Cria um mandato com cargos associados
   */
  criarMandatoComCargos(request: MandatoComCargosRequest): Observable<Mandato> {
    return this.http.post<Mandato>(`${this.urlPath}/com-cargos`, request);
  }

  /**
   * Obtém os cargos (ocupações) de um mandato
   */
  obterCargosMandato(mandatoId: number): Observable<MandatoCargo[]> {
    return this.http.get<MandatoCargo[]>(`${this.urlPath}/${mandatoId}/cargos`);
  }

  /**
   * Adiciona uma pessoa a um cargo do mandato
   */
  adicionarCargoMandato(mandatoId: number, cargo: MandatoCargoRequest): Observable<MandatoCargo> {
    return this.http.post<MandatoCargo>(`${this.urlPath}/${mandatoId}/cargo`, cargo);
  }

  /**
   * Atualiza um cargo de um mandato
   */
  atualizarCargoMandato(mandatoId: number, cargoId: number, cargo: MandatoCargoRequest): Observable<MandatoCargo> {
    return this.http.put<MandatoCargo>(`${this.urlPath}/${mandatoId}/cargos/${cargoId}`, cargo);
  }

  /**
   * Remove um cargo de um mandato
   */
  removerCargoMandato(mandatoId: number, cargoId: number): Observable<void> {
    return this.http.delete<void>(`${this.urlPath}/${mandatoId}/cargos/${cargoId}`);
  }

  getCargoTiposVinculo(){
    return this.http.get<MandatoParametro[]>(`${this.urlPath}/cargo/tipo-vinculo`);
  }

  getCargoTiposOcupacao(){
    return this.http.get<MandatoParametro[]>(`${this.urlPath}/cargo/tipo-ocupacao`);
  }

  getCargoMotivosSaida(){
    return this.http.get<MandatoParametro[]>(`${this.urlPath}/cargo/motivo-saida`);
  }
}
