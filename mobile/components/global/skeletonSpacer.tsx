import React from 'react'
import { MotiView } from 'moti'

interface Props {
  height: number
}

const SkeletonSpacer = ({ height = 16 }: Props) => {
  return (
    <MotiView style={{ height }} />
  )
}

export default SkeletonSpacer