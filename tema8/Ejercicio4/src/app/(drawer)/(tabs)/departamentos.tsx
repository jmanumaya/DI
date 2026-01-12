import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  TextInput,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useRouter } from "expo-router";
import { useDepartmentListViewModel } from "../../../vm/hooks/useDepartmentListViewModel";
import { Department } from "../../../domain/entities/Department";

const ListadoDepartamentos = observer(() => {
  const viewModel = useDepartmentListViewModel();
  const router = useRouter();

  useEffect(() => {
    viewModel.loadDepartments();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar eliminación",
      "¿Estás seguro de que deseas eliminar este departamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await viewModel.deleteDepartment(id);
            } catch (error) {
              Alert.alert("Error", viewModel.error || "No se pudo eliminar");
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: Department }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        router.push({
          pathname: "/(drawer)/editarInsertarDepartamento",
          params: { departmentData: JSON.stringify(item) },
        })
      }
      onLongPress={() => item.id && handleDelete(item.id)}
    >
      <Text style={styles.name}>{item.name}</Text>
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
          placeholder="Buscar departamento..."
          onChangeText={(text) => viewModel.search(text)}
          value={viewModel.searchQuery}
        />
      </View>

      <FlatList
        data={viewModel.displayedDepartments}
        renderItem={renderItem}
        keyExtractor={(item) => item.id || Math.random().toString()}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/(drawer)/editarInsertarDepartamento")}
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

export default ListadoDepartamentos;
