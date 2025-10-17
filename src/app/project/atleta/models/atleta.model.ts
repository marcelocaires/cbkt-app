export interface Atleta {
  id: number
  nomeAtleta: string
  dataCadastro: string
  sexo: string
  dataNascimento: string
  filiacaoMae: string
  filiacaoPai: string
  diaAnuidade: number
  mesAnuidade: number
  categoria: string
  graduacao: Graduacao
  codigoClube: number
  nomeClube: string
  codigoClubeInicial: number
  chkArbitro: boolean
  chkAvaliador: boolean
  ativo: boolean
  codigoCategoria: number
  chkArbitroCategoria: boolean
  pcd: boolean
  urlFoto: string
  dataFaixa: any
  nacionalidade: string
  naturalidade: string
  nomeMae: string
  nomePai: string
  observacao: string
  documentos: Documentos
  endereco: Endereco
  contato: Contato
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
