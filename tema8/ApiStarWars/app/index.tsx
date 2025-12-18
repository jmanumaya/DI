import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, StyleSheet, ActivityIndicator } from "react-native";
import { useRouter } from 'expo-router';
import { useCharacterListViewModel } from "../src/presentation/vm/useCharacterListViewModel";

export default function CharacterListScreen() {
  const router = useRouter();
  const { characters, selectedId, isLoading, selectCharacter } = useCharacterListViewModel();

  const handleNavigate = () => {
    if (selectedId) {
      // se mavega a la ruta dinámica pasando el ID
      router.push(`/detail/${selectedId}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Star Wars Personajes</Text>
      
      {isLoading ? (
        <ActivityIndicator size="large" color="#ffe81f" />
      ) : (
        <FlatList
          data={characters}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={[
                styles.item, 
                selectedId === item.id && styles.itemSelected
              ]}
              onPress={() => selectCharacter(item.id)}
            >
              <Text style={[
                styles.text,
                selectedId === item.id && styles.textSelected
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.footer}>
        <Button 
          title="Ver Detalles" 
          onPress={handleNavigate}
          disabled={!selectedId}
        />
      </View>
    </View>
  );
}

//#region styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 20 },
  header: { fontSize: 24, color: '#ffe81f', fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  item: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#444' },
  itemSelected: { backgroundColor: '#444', borderRadius: 5 },
  text: { color: '#eee', fontSize: 18 },
  textSelected: { color: '#ffe81f', fontWeight: 'bold' },
  footer: { marginTop: 20, paddingBottom: 20 }
});
//#endregion styles