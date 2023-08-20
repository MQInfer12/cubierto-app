import React from 'react'
import { Skeleton } from 'moti/skeleton'
import { colors } from '../../styles/colors'

const OfertaSkeleton = () => {
  return (
    <Skeleton 
      height={240}
      width={260}
      colorMode='light'
      backgroundColor={colors.gray400}
      radius={16}
    />
  )
}

export default OfertaSkeleton