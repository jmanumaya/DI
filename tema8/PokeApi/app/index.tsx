import React from 'react';
import { Text, View, FlatList, Button, StyleSheet, ActivityIndicator } from "react-native";
// Asegúrate de que la ruta de importación sea correcta según tu estructura de carpetas
import { usePokemonViewModel } from "../src/vm/pokemonViewModel"; 

export default function Index() {
  // 1. Instanciamos el ViewModel
  // Aquí ocurre la magia: la Vista se conecta al cerebro, pero no sabe nada de Repositorios ni APIs.
  const { pokemonList, loadMorePokemons, isLoading } = usePokemonViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista Pokémon MVVM</Text>
        <Text style={styles.subtitle}>Cargados: {pokemonList.length}</Text>
      </View>

      {/* 2. Lista de Datos */}
      <FlatList
        data={pokemonList}
        // Usamos el nombre como clave única (en una app real usaríamos un ID)
        keyExtractor={(item, index) => item.name + index} 
        
        // Renderizado de cada fila
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.pokemonName}>{item.name}</Text>
          </View>
        )}

        // 3. El Botón va en el pie de página de la lista (Footer)
        // Así siempre aparece al final, después de los pokémon cargados.
        ListFooterComponent={() => (
          <View style={styles.footer}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#6200ee" />
            ) : (
              <Button 
                title={pokemonList.length === 0 ? "Cargar Primeros 20" : "Cargar Siguientes 20"} 
                onPress={loadMorePokemons} 
              />
            )}
          </View>
        )}
        
        // Pequeño estilo para cuando la lista está vacía
        contentContainerStyle={pokemonList.length === 0 ? styles.centerEmpty : null}
      />
    </View>
  );
}

// Estilos básicos para que se vea ordenado
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  pokemonName: {
    fontSize: 18,
    textTransform: 'capitalize', // Pone la primera letra en mayúscula
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  centerEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
  }
});