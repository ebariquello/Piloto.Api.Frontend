/**
 * Converts float numbers to BRL currency.
 *
 * Example: 34.5 to R$ 34,50
 *
 * @param value number
 */
export function convertToCurrency(value: number): string {
  return value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
}

/**
 * Replaces dot in float numbers with a comma (with 2 fraction digits).
 *
 * Example: 1.5 to 1,50
 *
 * @param value number
 */
export function convertToComma(value: number): string {
  return value.toLocaleString('pt-br', { minimumFractionDigits: 2 });
}
