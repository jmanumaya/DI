import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Screen Index.</Text>
    </View>
  );
}

//#region styles
const styles = StyleSheet.create({
  container: {
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