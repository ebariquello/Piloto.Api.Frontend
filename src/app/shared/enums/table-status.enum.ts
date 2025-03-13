export enum TableStatusEnum {
  'AGUARDANDO_APROVACAO' = 1,
  'APROVADO' = 2,
  'REPROVADO' = 3,
  'CANCELADO' = 4,
  'APROVADO_AGUARDANDO_ATIVACAO' = 5,
  'EXPIRADO' = 6,
  'INATIVO' = 7,
}

export function TableStatusEnumDescription(value: TableStatusEnum) {
  switch (value) {
    case TableStatusEnum.AGUARDANDO_APROVACAO:
      return 'Aguardando aprovação';
    case TableStatusEnum.APROVADO:
      return 'Aprovado';
    case TableStatusEnum.REPROVADO:
      return 'Reprovado';
    case TableStatusEnum.CANCELADO:
      return 'Cancelado';
    case TableStatusEnum.APROVADO_AGUARDANDO_ATIVACAO:
      return 'Aguardando ativação';
    default:
      return 'Desconhecido';
  }
}
