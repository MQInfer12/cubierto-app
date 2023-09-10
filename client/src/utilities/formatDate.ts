export const formatFecha = (date: Date) => {
  const fecha = new Date(date);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const string = `${dia}/${mes}/${anio}`;
  const minuto = fecha.getMinutes();
  const hora = fecha.getHours();
  const horas = `${hora}:${minuto}`;
  return string + " " + horas;
}