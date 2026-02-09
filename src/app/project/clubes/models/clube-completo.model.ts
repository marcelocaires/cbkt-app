export interface ClubeCompleto {
  id: number;
  nome: string;
  abreviatura?: string;
  classificacao?: string;
  cnpj?: string;
  dataFundacao?: string;
  contato?: ContatoDto;
  endereco?: EnderecoDto;
  diretoria?: ClubeDiretoriaDto;
  mandatos?: MandatoResponseDto[];
  diretoriaAtiva?: MandatoCargoDto[];
  instrutores?: ClubeInstrutorDto[];
  atletas?: AtletaClubeDto[];
  totalAtletas?: number;
  totalInstrutores?: number;
  totalMandatos?: number;
  totalAtletasTransferidos?: number;
  totalAtletasArbitros?: number;
  totalAtletasAvaliadores?: number;
}

export interface ContatoDto {
  email?: string;
  telefone?: string;
}

export interface EnderecoDto {
  logradouro?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  uf?: string;
  cep?: string;
}

export interface ClubeDiretoriaDto {
  presidente?: string;
  directorTecnico?: string;
  responsavel?: string;
}

export interface MandatoResponseDto {
  id: number;
  tipoEntidade: string;
  entidadeId: number;
  dataInicio: string;
  dataFim?: string;
  ativo: boolean;
  descricao?: string;
  documentoPath?: string;
  criadoEm: string;
  atualizadoEm?: string;
  criadoPorCpf: string;
  criadoPorNome: string;
  atualizadoPorCpf?: string;
  atualizadoPorNome?: string;
  cargos?: MandatoCargoDto[];
  versao: number;
}

export interface MandatoCargoDto {
  id: number;
  pessoa: PessoaDto;
  tipoOcupacao: string;
  tipoVinculo: string;
  dataInicio: string;
  dataFim?: string;
  ativo: boolean;
  substituiuId?: number;
  motivoSaida?: string;
  observacao?: string;
}

export interface PessoaDto {
  id: number;
  nome: string;
  cpf: string;
  rg?: string;
  dataNascimento?: string;
  email?: string;
  telefone?: string;
  tipo: string;
  ativo: boolean;
}

export interface ClubeInstrutorDto {
  id: number;
  atletaId: number;
  atletaNome: string;
  dataInicio?: string;
  dataFim?: string;
  ativo: boolean;
  observacao?: string;
}

export interface AtletaClubeDto {
  id: number;
  atletaId: number;
  atletaNome: string;
  dataAdmissao?: string;
  dataSaida?: string;
  transferido?: boolean;
  clubeOrigemId?: number;
  clubeOrigemNome?: string;
}
