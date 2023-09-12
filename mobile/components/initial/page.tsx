import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import Animated, { useSharedValue, withTiming } from 'react-native-reanimated'
import FontedText from '../global/fontedText';
import { colors } from '../../styles/colors';

interface Props {
  data: {
    image: React.JSX.Element;
    title: string;
    description: string;
  }
}

const Page = ({ data }: Props) => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(1, { duration: 1000 });
  }, []);

  return (
    <Animated.View 
      style={[
        styles.pageContainer,
        { opacity }
      ]}
    >
      {data.image}
      <FontedText style={styles.title} weight={700}>{data.title}</FontedText>
      <FontedText style={styles.description}>{data.description}</FontedText>
    </Animated.View>
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