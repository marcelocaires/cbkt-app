export interface AtletaShort {
  id: number;
  nomeAtleta: string;
  nomeClube: string | null;        // pode vir nulo no backend
  graduacaoDescricao: string | null;
  graduacaoCorHex: string | null;
}
