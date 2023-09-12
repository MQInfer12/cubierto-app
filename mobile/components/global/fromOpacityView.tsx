import React, { useEffect } from 'react'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated';

interface Props {
  duration?: number,
  children: JSX.Element | JSX.Element[],
  style?: any
}

const FromOpacityView = ({ children, duration, style = {} }: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, duration ? { duration: 1000 } : undefined);
  }, []);

  return (
    <Animated.View style={[style, { opacity }]}>
      {children}
    </Animated.View>
  )
}

export default FromOpacityView