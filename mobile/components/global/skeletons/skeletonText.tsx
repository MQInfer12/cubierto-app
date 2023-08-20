import { StyleSheet, Platform } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { colors } from '../../../styles/colors'

interface Props {
  width?: string | number | undefined
  fontSize: number
}

const SkeletonText = ({ width, fontSize }: Props) => {
  return (
    <Skeleton
      width={width} 
      height={Platform.OS === "ios" ? fontSize * 1.18 : fontSize * 1.33}
      colorMode='light'
      backgroundColor={colors.gray400}
    />
  )
}

export default SkeletonText

const styles = StyleSheet.create({})