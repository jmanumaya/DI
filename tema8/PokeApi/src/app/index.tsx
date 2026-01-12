import React from 'react';
import { 
  Text, 
  View, 
  FlatList, 
  StyleSheet, 
  ActivityIndicator, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar,
  Dimensions // Lo usamos para calcular anchos si hace falta
} from "react-native";
import { usePokemonViewModel } from "../vm/pokemonViewModel"; 

export default function Index() {
  const { pokemonList, loadMorePokemons, isLoading } = usePokemonViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f2f2f7" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Pokédex</Text>
        <View style={styles.badge}>
            <Text style={styles.badgeText}>{pokemonList.length}</Text>
        </View>
      </View>

      {/* LISTA TIPO GRID */}
      <FlatList
        data={pokemonList}
        keyExtractor={(item, index) => item.name + index}
        
        // --- AQUÍ ESTÁ EL TRUCO PARA QUE SEAN VARIAS POR LÍNEA ---
        numColumns={4} 
        // Estilo para separar las columnas horizontalmente
        columnWrapperStyle={styles.rowSpacing}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}

        renderItem={({ item, index }) => (
          // TARJETA CUADRADA
          <View style={styles.card}>
            
            {/* Círculo Arriba */}
            <View style={styles.cardAvatar}>
              <Text style={styles.avatarText}>
                {item.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            
            {/* Texto Abajo y Centrado */}
            <Text style={styles.pokemonName}>{item.name}</Text>
            <Text style={styles.pokemonId}>#{item.id}</Text>
            
          </View>
        )}

        // FOOTER (Loader)
        ListFooterComponent={() => (
           isLoading && pokemonList.length > 0 ? (
             <View style={styles.loaderArea}>
               <ActivityIndicator size="small" color="#6200ee" />
             </View>
           ) : null
        )}
      />

      {/* BOTÓN FLOTANTE */}
      <TouchableOpacity 
        style={[styles.fab, isLoading && styles.fabDisabled]} 
        onPress={loadMorePokemons}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
            <ActivityIndicator color="white" />
        ) : (
            <Text style={styles.fabIcon}>+</Text>
        )}
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f7',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  badge: {
    backgroundColor: '#e1e1e6',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: { fontWeight: 'bold', color: '#333' },

  // --- ESTILOS DE LA LISTA Y GRID ---
  listContent: {
    paddingHorizontal: 12, // Un poco de margen a los lados de la pantalla
    paddingBottom: 100,
  },
  rowSpacing: {
    justifyContent: 'space-between', // Separa las tarjetas uniformemente
  },

  // --- ESTILOS DE LA TARJETA (GRID ITEM) ---
  card: {
    // FLEX 1 es clave: hace que la tarjeta ocupe el espacio disponible en su columna
    flex: 1, 
    backgroundColor: '#ffffff',
    margin: 6, // Separación entre tarjetas (arriba, abajo, izq, der)
    padding: 16,
    borderRadius: 16,
    alignItems: 'center', // Todo centrado horizontalmente
    justifyContent: 'center',

    // Sombras
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10, // Espacio entre bolita y texto
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  pokemonName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textTransform: 'capitalize',
    textAlign: 'center',
    marginBottom: 4,
  },
  pokemonId: {
    fontSize: 12,
    color: '#888',
    fontWeight: '600',
  },

  // OTROS
  loaderArea: { padding: 20 },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: "#6200ee",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  fabDisabled: { backgroundColor: '#b599e8' },
  fabIcon: { fontSize: 32, color: 'white', marginTop: -4 }
});