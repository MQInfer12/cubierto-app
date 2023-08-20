import { StyleSheet, Text, View, Platform } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { colors } from '../../styles/colors'
import SkeletonSpacer from '../global/skeletons/skeletonSpacer'
import SkeletonText from '../global/skeletons/skeletonText'

const CategoriaSkeleton = () => {
  return (
    <View>
      <Skeleton 
        width={52} 
        height={52}
        colorMode='light'
        backgroundColor={colors.gray400}
        radius="round"
      />
      <SkeletonSpacer height={8} />
      <SkeletonText 
        fontSize={12}
        width={52}
      />
    </View>
  )
}

export default CategoriaSkeleton

const styles = StyleSheet.create({})