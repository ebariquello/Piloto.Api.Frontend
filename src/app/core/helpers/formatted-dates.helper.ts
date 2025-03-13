export function formatDate(date: string | null): string | null {
  if (date) {
    return new Date(date).toLocaleDateString('pt-br');
  }
  return null;
}

export function formateDateWithHour(date: string | null): string | null {
  const timeOptions = { hour: '2-digit', minute: '2-digit' };

  if (date) {
    return new Date(date).toLocaleDateString('pt-br', timeOptions);
  }
  return null;
}
