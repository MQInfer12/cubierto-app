import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors } from '../../styles/colors'
import FontedText from './fontedText'

interface Props<T> {
  page: T
  setPage: React.Dispatch<React.SetStateAction<T>>
  data: T[]
}

const Tabs = <T,>({ page, setPage, data }: Props<T>) => {
  return (
    <View style={styles.tabContainer}>
      {data.map((item, index) => (
        <TouchableOpacity key={index} style={styles.tabIndex(page === item)} onPress={() => setPage(item)}>
          <FontedText weight={600} style={styles.tabIndexText(page === item)}>{item as string}</FontedText>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Tabs

const styles = StyleSheet.create<any>({
  tabContainer: { 
    flexDirection: "row"
  },
  tabIndex: (active: boolean) => ({
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: active ? colors.primary500 : colors.gray500,
    paddingVertical: 8,
  }),
  tabIndexText: (active: boolean) => ({
    textAlign: "center",
    color: active ? colors.primary500 : colors.gray500
  })
})