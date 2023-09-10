import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

type IconName = keyof typeof Ionicons.glyphMap

interface Props {
  name: IconName | string,
  size: number,
  color: string
}

const Icon = ({ name, size, color }: Props) => {
  return (
    <Ionicons name={name as IconName} size={size} color={color} />
  )
}

export default Icon

const styles = StyleSheet.create({})