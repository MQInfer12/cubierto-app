import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react'
import { PanResponder, PanResponderStatic, View } from 'react-native';
import { useCola } from '../../context/cola';
import { useHandleCola } from '../../hooks/useHandleCola';

interface Props {
  children: JSX.Element | JSX.Element[]
}

const IddleManager = ({ children }: Props) => {
  const timerId = useRef<any>(false)
  const { cola, timer, countTimer, resetTimer } = useCola();
  const { myTurn, salirDeCola } = useHandleCola();

  const reset = () => {
    clearInterval(timerId.current);
    resetTimer();
  }

  const resetInactivityInterval = () => {
    timerId.current = setInterval(() => {
      countTimer();
    }, 1000);
  };

  useEffect(() => {
    if(timer === 0) {
      salirDeCola();
      reset();
    }
  }, [timer]);

  useEffect(() => {
    if(cola && myTurn) {
      resetInactivityInterval();
    }
    if(!cola) {
      reset();
    }
  }, [cola]);

  return children;
}

export default IddleManager