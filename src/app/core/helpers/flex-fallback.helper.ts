import { FlexSelectModel } from 'app/core/services/flex-condition/flex-condition.model';

/**
 * Payment products fallback in case the integrations fails.
 * This list does not changes often, but requires maintenance.
 */
export const productFallback: FlexSelectModel[] = [
  {
    Id: 1,
    Name: 'MASTERCARD'
  },
  {
    Id: 2,
    Name: 'VISA'
  },
  {
    Id: 3,
    Name: 'DINERS CLUB'
  },
  {
    Id: 4,
    Name: 'CABALL'
  },
  {
    Id: 6,
    Name: 'SOROCRED'
  },
  {
    Id: 7,
    Name: 'HIPERCARD'
  },
  {
    Id: 9,
    Name: 'CALCARD'
  },
  {
    Id: 10,
    Name: 'CONSTRUCARD'
  },
  {
    Id: 11,
    Name: 'AVISTA'
  },
  {
    Id: 12,
    Name: 'CREDSYSTEM'
  },
  {
    Id: 13,
    Name: 'AMERICAN EXPRESS'
  },
  {
    Id: 14,
    Name: 'ELO'
  },
  {
    Id: 15,
    Name: 'HIPER'
  },
  {
    Id: 16,
    Name: 'Alelo'
  },
  {
    Id: 33,
    Name: 'Preparação para Novas Bandeira'
  },
  {
    Id: 38,
    Name: 'BANDEIRA G'
  },
  {
    Id: 44,
    Name: 'teste'
  },
  {
    Id: 62,
    Name: 'teste 27'
  },
  {
    Id: 68,
    Name: 'teste'
  },
  {
    Id: 72,
    Name: 'BAND RESERVADA'
  },
  {
    Id: 73,
    Name: 'BAND RESERVADA'
  },
  {
    Id: 74,
    Name: 'BANESCARD'
  },
  {
    Id: 76,
    Name: 'JCB'
  },
  {
    Id: 77,
    Name: 'CREDZ'
  },
  {
    Id: 89,
    Name: 'teste'
  },
  {
    Id: 93,
    Name: 'TESTE NOVAS BANDEIRAS'
  },
  {
    Id: 99,
    Name: '99'
  },
  {
    Id: 999,
    Name: 'OUTROS'
  }
];

/**
 * Modalities fallback in case the integrations fails.
 * This list does not changes often, but requires maintenance.
 */
export const modalityCallback: FlexSelectModel[] = [
  {
    Name: 'CT007040220160502191601030116',
    Id: 8
  },
  {
    Name: 'MINHA CASA MINHA VIDA',
    Id: 125
  },
  {
    Name: 'CT0070402201601030116',
    Id: 10
  },
  {
    Name: 'CT007040220160103021601030216',
    Id: 11
  },
  {
    Name: 'CT007040220160103021602030016',
    Id: 12
  },
  {
    Name: 'CT0070402201601032316',
    Id: 13
  },
  {
    Name: 'CT0070402201602030016',
    Id: 14
  },
  {
    Name: 'CT0070402201602030016',
    Id: 15
  },
  {
    Name: 'CT0070402201602030016',
    Id: 16
  },
  {
    Name: 'CT0070402201602030116',
    Id: 19
  },
  {
    Name: 'CT0070402201602030116',
    Id: 21
  },
  {
    Name: 'CT0070402201602032016',
    Id: 23
  },
  {
    Name: 'CT007040220161003201620091416',
    Id: 24
  },
  {
    Name: 'CT0070402201620091516',
    Id: 25
  },
  {
    Name: 'CT00704022016',
    Id: 50
  },
  {
    Name: 'CT00720091716',
    Id: 26
  },
  {
    Name: '5445451',
    Id: 54
  },
  {
    Name: 'CT01121090716',
    Id: 27
  },
  {
    Name: 'Rotativo',
    Id: 1
  },
  {
    Name: 'Parcelado sem Juros',
    Id: 2
  },
  {
    Name: 'Parcelado com Juros',
    Id: 3
  },
  {
    Name: 'A vis',
    Id: 4
  },
  {
    Name: 'Pre-datado',
    Id: 5
  }
];
