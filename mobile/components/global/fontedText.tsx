import React, { ReactNode } from 'react';
import {StyleSheet, Text, TextStyle } from 'react-native';

interface Props {
  children: ReactNode,
  style?: TextStyle,
  weight?: number
}

const FontedText = ({ children, style, weight = 400, ...props }: Props) => {
return (
    <Text style={[styles.text(weight), style]} {...props}>{ children }</Text>
  );
}

const styles = StyleSheet.create<any>({
  text: (weight: number): TextStyle => ({
    fontFamily: `Poppins${weight}`
  })
})

export default FontedText;