import React, { useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { observer } from "mobx-react-lite";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useDepartmentEditViewModel } from "../../vm/hooks/useDepartmentEditViewModel";
import { Department } from "../../domain/entities/Department";

const EditarInsertarDepartamento = observer(() => {
  const viewModel = useDepartmentEditViewModel();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    let department: Department | undefined;
    if (params.departmentData && typeof params.departmentData === "string") {
      department = JSON.parse(params.departmentData);
    }
    viewModel.initialize(department);
  }, [params]);

  const handleSave = async () => {
    const success = await viewModel.save();
    if (success) {
      Alert.alert("Éxito", "Departamento guardado correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", "No se pudo guardar el departamento");
    }
  };

  if (viewModel.isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre del Departamento *</Text>
        <TextInput
          style={styles.input}
          value={viewModel.name}
          onChangeText={(text) => (viewModel.name = text)}
          placeholder="Ingrese el nombre del departamento"
        />
        {viewModel.errors.name && (
          <Text style={styles.errorText}>{viewModel.errors.name}</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  formContainer: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default EditarInsertarDepartamento;
