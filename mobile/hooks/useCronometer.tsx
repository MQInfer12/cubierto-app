import { useState, useEffect } from 'react'

export const useCronometer = (date: Date, maxTime: number) => {
  const [tiempoRestante, setTiempoRestante] = useState<number>(() => {
    const ahora = new Date();
    const fecha = new Date(date);
    const diff = ahora.getTime() - fecha.getTime();
    const seconds = diff / 1000;
    const minutes = seconds / 60;
    const segundosRestantes = (maxTime - minutes) * 60;
    const redondear = Math.floor(segundosRestantes);
    return redondear;
  });

  useEffect(() => {
    let interval: any;
    if(tiempoRestante !== null) {
      interval = setInterval(() => {
        setTiempoRestante(old => {
          if(old !== null) {
            return old - 1
          } 
          return old;
        });
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    }
  }, [tiempoRestante]);

  let horas = 0;
  let minutos = 0;
  let segundos = 0;
  let restanteString = "--:--:--";
  let isActive = false;
  if(tiempoRestante) {
    horas = Math.floor(tiempoRestante / 3600);
    minutos = Math.floor((tiempoRestante / 60) % 60);
    const minutosConCero = minutos < 10 ? "0" + minutos : minutos;
    segundos = tiempoRestante % 60;
    const segundosConCero = segundos < 10 ? "0" + segundos : segundos;
    restanteString = horas + ":" + minutosConCero + ":" + segundosConCero;
    isActive = tiempoRestante > 0;
  }

  return {
    tiempoRestante,
    restanteString,
    isActive,
  }
}