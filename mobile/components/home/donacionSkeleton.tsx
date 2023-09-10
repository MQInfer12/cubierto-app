import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { colors } from '../../styles/colors'

const DonacionSkeleton = () => {
  return (
    <View style={styles.container}>
      <Skeleton 
        height={200}
        width={"100%"}
        colorMode='light'
        backgroundColor={colors.gray400}
        radius={12}
      />
    </View>
  )
}

export default DonacionSkeleton

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 32,
    borderRadius: 12,
  },
})