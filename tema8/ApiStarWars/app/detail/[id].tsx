import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router'; // esto es ara leer el parámetro ID
import { useCharacterDetailViewModel } from '../../src/presentation/vm/useCharacterDetailViewModel';

export default function CharacterDetailScreen() {
  // obtenemos el id de la URL
  const { id } = useLocalSearchParams<{ id: string }>();
  
  // inyectamos el ID al ViewModel
  const { character, isLoading } = useCharacterDetailViewModel(id);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: character ? character.name : 'Cargando...' }} />

      {isLoading ? (
        <ActivityIndicator size="large" color="#ffe81f" />
      ) : character ? (
        <View style={styles.card}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{character.name}</Text>

          <Text style={styles.label}>Género:</Text>
          <Text style={styles.value}>{character.gender}</Text>

          <Text style={styles.label}>Planeta (Homeworld):</Text>
          <Text style={styles.value}>{character.homeworldName}</Text>
        </View>
      ) : (
        <Text style={styles.error}>No se pudo cargar el personaje.</Text>
      )}
    </View>
  );
}

//#region styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#222', padding: 20, justifyContent: 'center' },
  card: { backgroundColor: '#333', padding: 20, borderRadius: 10, alignItems: 'center' },
  label: { color: '#888', fontSize: 16, marginTop: 10 },
  value: { color: '#ffe81f', fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  error: { color: 'red', fontSize: 18, textAlign: 'center' }
});
//#endregion styles