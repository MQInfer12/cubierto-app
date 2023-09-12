import { StyleSheet } from 'react-native'
import React from 'react'
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from 'react-native-reanimated'
import { colors } from '../../styles/colors'

interface Props {
  active: boolean
}

const Dot = ({ active }: Props) => {
  const width = useDerivedValue(() => withTiming(active ? 32 : 4));
  const progress = useDerivedValue(() => withTiming(active ? 1 : 0));

  const animatedColor = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [colors.gray500, colors.primary500]
    );

    return {
      backgroundColor
    }
  });

  const animatedWidth = {
    width: width
  }

  return (
    <Animated.View 
      style={[
        styles.point,
        animatedWidth,
        animatedColor
      ]} 
    />
  )
}

export default Dot

const styles = StyleSheet.create({
  point: {
    height: 4,
    width: 4,
    borderRadius: 2,
    marginHorizontal: 4
  }
})