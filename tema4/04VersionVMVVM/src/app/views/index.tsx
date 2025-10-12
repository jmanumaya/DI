import { Text, View, FlatList, StyleSheet, Pressable, Alert } from "react-native";
import { IndexVM } from "../viewmodels/IndexVM";

const usuarios = IndexVM.getPersonas();

export function Index() {

  const handlePress = (id: number) => {
    const persona = IndexVM.getPersonaById(id);
    if (persona) {
      Alert.alert(
        "Información de usuario",
        `${persona.nombre} ${persona.apellido}`,
        [{ text: "OK" }]
      );
    }
  };

  return (
    <FlatList
      style={styles.flat}
      data={usuarios}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePress(item.id)}>
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
