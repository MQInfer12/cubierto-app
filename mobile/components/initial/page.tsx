import { StyleSheet } from 'react-native'
import React from 'react'
import FontedText from '../global/fontedText';
import { colors } from '../../styles/colors';
import FromOpacityView from '../global/fromOpacityView';

interface Props {
  data: {
    image: React.JSX.Element;
    title: string;
    description: string;
  }
}

const Page = ({ data }: Props) => {
  return (
    <FromOpacityView duration={1000} style={styles.pageContainer}>
      {data.image}
      <FontedText style={styles.title} weight={700}>{data.title}</FontedText>
      <FontedText style={styles.description}>{data.description}</FontedText>
    </FromOpacityView>
  )
}

export default Page

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    opacity: 0
  },
  title: {
    color: colors.gray900,
    fontSize: 24,
    marginBottom: 12
  },
  description: {
    color: colors.gray600,
    fontSize: 16,
    textAlign: "center"
  },
})