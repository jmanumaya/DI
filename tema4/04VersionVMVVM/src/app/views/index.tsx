import { Text, View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { IndexVM } from "../viewmodels/IndexVM";

const indexVM = new IndexVM();

export function Index() {
  return (
    <FlatList
      style={styles.flat}
      data={indexVM.Personas}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => (indexVM.PersonaSeleccionada = item)}>
          <View style={styles.item}>
            <Text style={styles.text}>{item.nombre} {item.apellido}</Text>
          </View>
        </Pressable>
      )}
    />
  );
}

//#region styles
const styles = StyleSheet.create({
  flat: {
    backgroundColor: "#242424ff"
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: "#3a3a3aff",
    margin: 3
  },
  text: {
    fontSize: 17,
    color: "#aaaaaaff"
  }
})
//#endregion
