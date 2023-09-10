export const formatFecha = (date: Date) => {
  const fecha = new Date(date);
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const anio = fecha.getFullYear();
  const string = `${dia}/${mes}/${anio}`;
  const minuto = fecha.getMinutes();
  const minutoConCeros = minuto < 10 ? `0${minuto}` : minuto;
  const hora = fecha.getHours();
  const horaConCeros = hora < 10 ? `0${hora}` : hora;
  const horas = `${horaConCeros}:${minutoConCeros}`;
  return string + " " + horas;
}