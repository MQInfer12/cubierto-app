import React, { ReactNode } from 'react';
import {StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  children: ReactNode,
  style?: TextStyle,
  weight?: number,
  numberOfLines?: number
}

const FontedText = ({ children, style, weight = 400, numberOfLines, ...props }: Props) => {
return (
    <Text style={[
      styles.text(weight), {
        ...style, 
        lineHeight: style?.lineHeight || (style?.fontSize || 12) * 1.33
      }
    ]} {...props} numberOfLines={numberOfLines}>
      { children }
    </Text>
  );
}

const styles = StyleSheet.create<any>({
  text: (weight: number): TextStyle => ({
    fontFamily: `Poppins${weight}`
  })
})

export default FontedText;