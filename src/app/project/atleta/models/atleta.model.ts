export interface Atleta {
  id: number;
  nomeAtleta: string;
  dataCadastro: string;
  sexo: string;
  dataNascimento: string;
  filiacaoMae: string;
  filiacaoPai: string;
  diaAnuidade: number;
  mesAnuidade: number;
  categoria: string;
  codigoGraduacao: number;
  descricaoGraduacao: string;
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
  dataFaixa: string | null;
  graduacao: string;
  nacionalidade: string;
  naturalidade: string;
  nomeMae: string;
  nomePai: string;
  observacao: string;
  documentos: {
    cpf: string;
    rg: string;
    rgOrgao: string;
    rgEstado: string;
    certidaoNascimento: string;
  };
  endereco: {
    logradouro: string;
    numero: string;
    bairro: string;
    complemento: string;
    cidade: string;
    estado: string;
    cep: string;
    uf: string;
  };
  contato: {
    email: string;
    telefone: string;
  };
}
