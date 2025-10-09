import { Text, View, FlatList, StyleSheet } from "react-native";
import { IndexVM } from "../viewmodels/IndexVM"

const usuarios = IndexVM.getPersonas()

export function Index() {
  return (
    <FlatList
    data={usuarios}
    keyExtractor= {(item) => item.id.toString()}
    renderItem = {({ item }) => (
      <View style={styles.item}>
        <Text style={styles.text}>{item.nombre} {item.apellido}</Text>
      </View>
    )}
    />
  )
}

//#region styles
const styles = StyleSheet.create({
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3ff',
    alignItems: 'center',
  },
  text: {
    fontSize: 17
  }
})
//#endregion