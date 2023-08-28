import React, { useEffect, useState, useRef } from 'react'
import { PanResponder, View } from 'react-native';

interface Props {
  children: JSX.Element
}

const IddleManager = ({ children }: Props) => {
  const timerId = useRef<any>(false)
  const [timeForInactivity] = useState(1);

  useEffect(() => {
    resetInactivityTimeout();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponderCapture: () => {
        resetInactivityTimeout();
        return false;
      }
    })
  ).current;

  const resetInactivityTimeout = () => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      console.log("Usuario inactivo")
    }, timeForInactivity * 60 * 1000);
  }

  return (
    <View style={{ flex: 1 }} {...panResponder.panHandlers}>
      { children }
    </View>
  );
}

export default IddleManager