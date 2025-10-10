export type FlagAnuidade = 'SIM' | 'NAO';

export interface Graduacao {
  id: number;
  descricaoGraduacao: string;
  grau: string | null;
  corNome: string | null;
  corCodigo: string | null;
  carencia: number;
  carenciaMenor: number;
  valor: number;
  idadeMinima: number;
  anuidadeAte: number;
  anuidadeApos: number;
  anuidade: FlagAnuidade;
}
