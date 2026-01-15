import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Person } from "../../../domain/entities/Person";
import { usePersonListViewModel } from "../../../vm/hooks/usePersonListViewModel";

const ListadoPersonas = observer(() => {
  const viewModel = usePersonListViewModel();
  const router = useRouter();

  useEffect(() => {
    viewModel.loadPersons();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar esta persona?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await viewModel.deletePerson(id);
            } catch {
              Alert.alert("Error", viewModel.error || "No se pudo eliminar");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Person }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: "/(drawer)/editarInsertarPersonas",
          params: { personData: JSON.stringify(item) },
        })
      }
      onLongPress={() => item.id && handleDelete(item.id)}
    >
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.details}>Edad: {item.age}</Text>
      </View>
    </TouchableOpacity>
  );

  if (viewModel.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (viewModel.error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{viewModel.error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar persona..."
          onChangeText={(text) => viewModel.search(text)}
          value={viewModel.searchQuery}
        />
      </View>

      <FlatList
        data={viewModel.displayedPersons}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || Math.random().toString()}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(drawer)/editarInsertarPersonas")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    padding: 16,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  searchInput: {
    backgroundColor: "#f0f0f0",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
  item: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  details: {
    fontSize: 14,
    color: "#666",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  fabText: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
});

export default ListadoPersonas;
