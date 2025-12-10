export interface Atleta {
  id: number | null;
  nomeAtleta: string;
  dataCadastro: string;
  sexo: string;
  dataNascimento: string;
  filiacaoMae: string;
  filiacaoPai: string;
  diaAnuidade: number;
  mesAnuidade: number;
  categoria: string;
  codigoClube: number;
  nomeClube: string;
  codigoClubeInicial: number;
  chkArbitro: boolean;
  chkAvaliador: boolean;
  ativo: boolean;
  codigoCategoria: number;
  chkArbitroCategoria: boolean;
  pcd: boolean;
  urlFoto: string;
  dataFaixa: string;
  nacionalidade: string;
  naturalidade: string;
  nomeMae: string;
  nomePai: string;
  observacao: string;
  documentos: Documentos;
  endereco: Endereco;
  contato: Contato;
  graduacao: Graduacao;
  graduacoes: AtletaGraduacao[];
  clubes: AtletaClube[];
}
export interface Graduacao {
  id: number
  descricaoGraduacao: string
  grau: string
  grauNome: string
  cor: any
  corNome: any
  corHex: any
  carencia: number
  carenciaMenor: number
  numeroAulas: any
  valor: number
  idadeMinima: number
  anuidadeAte: number
  anuidadeApos: number
  anuidade: string
}

export interface AtletaGraduacao{
  id: number;
  graduacao: Graduacao;
  dataGraduacao: string;
  notaGraduacao: number;
}
export interface Documentos {
  cpf: string
  rg: string
  rgOrgao: string
  rgEstado: string
  certidaoNascimento: string
}

export interface Endereco {
  logradouro: string
  numero: string
  bairro: string
  complemento: string
  cidade: string
  estado: string
  cep: string
  uf: string
}

export interface Contato {
  email: string
  telefone: string
}

export interface Clube{
  id: number;
  nome: string;
  abreviatura: string;
  classificacao: string;
  cnpj: string;
  responsavel: string;
  presidente: string;
  diretorTecnico: string;
  dataFundacao: string;
  telefone: string;
  email: string;
  endereco: Endereco;
}

export interface AtletaClube {
  id: number;
  clube: Clube;
  dataAdmissao: string;
  transferido: boolean;
  dataSaida: string;
  clubeOrigem: Clube | null;
}
