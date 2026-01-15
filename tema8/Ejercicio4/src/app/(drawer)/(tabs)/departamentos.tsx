import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
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
import { container } from "../../../../di/container";
import { TIPOS } from "../../../../di/types";
import { DepartamentoListItem } from "../../../../presentation/components/departamentos/DepartamentoListItem";
import { DepartamentosViewModel } from "../../../../presentation/viewmodels/departamentos/DepartamentosViewModel";

export const ListadoDepartamentosScreen: React.FC = observer(() => {
  const viewModel = container.get<DepartamentosViewModel>(
    TIPOS.DepartamentosViewModel
  );
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      viewModel.cargarDepartamentos();
      setIsInitialized(true);
    }
  }, []);

  const handleDelete = (id: string, nombre: string) => {
    Alert.alert(
      "Eliminar Departamento",
      `¿Desea eliminar a ${nombre}?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await viewModel.eliminarDepartamento(id);
              Alert.alert("Éxito", "Departamento eliminado correctamente");
            } catch (error) {
              Alert.alert(
                "Error",
                error instanceof Error ? error.message : "Error al eliminar"
              );
            }
          },
        },
      ]
    );
  };

  if (viewModel.isLoading && viewModel.departamentos.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar departamento..."
          onChangeText={(text) => viewModel.buscar(text)}
          value={viewModel.searchQuery}
          placeholderTextColor="#999"
        />
      </View>

      {viewModel.error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{viewModel.error}</Text>
        </View>
      )}

      <FlatList
        data={viewModel.departamentosFiltered}
        keyExtractor={(item) => item.id || Math.random().toString()}
        renderItem={({ item }) => (
          <DepartamentoListItem
            departamento={item}
            onPress={(d) => {
              viewModel.seleccionarDepartamento(d);
              router.push("/(drawer)/editarDepartamento");
            }}
            onLongPress={(id) => handleDelete(id, item.nombre)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="briefcase-outline"
              size={48}
              color="#ccc"
            />
            <Text style={styles.emptyText}>No hay departamentos</Text>
          </View>
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          viewModel.limpiarSeleccion();
          router.push("/(drawer)/editarDepartamento");
        }}
      >
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    color: "#333",
  },
  errorContainer: {
    backgroundColor: "#ffebee",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  errorText: {
    color: "#c62828",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#999",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});

export default ListadoDepartamentosScreen;
