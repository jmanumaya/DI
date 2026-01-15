import { useLocalSearchParams, useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { Person } from "../../domain/entities/Person";
import { usePersonEditViewModel } from "../../vm/hooks/usePersonEditViewModel";

const EditarInsertarPersonas = observer(() => {
  const viewModel = usePersonEditViewModel();
  const router = useRouter();
  const params = useLocalSearchParams();

  useEffect(() => {
    let person: Person | undefined;
    if (params.personData && typeof params.personData === "string") {
      person = JSON.parse(params.personData);
    }
    viewModel.initialize(person);
    viewModel.loadDepartments();
  }, [params]);

  const handleSave = async () => {
    const success = await viewModel.save();
    if (success) {
      Alert.alert("Éxito", "Persona guardada correctamente", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } else {
      Alert.alert("Error", "No se pudo guardar la persona");
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
        <Text style={styles.label}>Nombre *</Text>
        <TextInput
          style={styles.input}
          value={viewModel.name}
          onChangeText={(text) => (viewModel.name = text)}
          placeholder="Ingrese el nombre completo"
        />
        {viewModel.errors.name && (
          <Text style={styles.errorText}>{viewModel.errors.name}</Text>
        )}

        <Text style={styles.label}>Edad *</Text>
        <TextInput
          style={styles.input}
          value={viewModel.age}
          onChangeText={(text) => (viewModel.age = text)}
          placeholder="Ingrese la edad"
          keyboardType="numeric"
        />
        {viewModel.errors.age && (
          <Text style={styles.errorText}>{viewModel.errors.age}</Text>
        )}

        <Text style={styles.label}>URL de Foto</Text>
        <TextInput
          style={styles.input}
          value={viewModel.photoUrl}
          onChangeText={(text) => (viewModel.photoUrl = text)}
          placeholder="Ingrese la URL de la foto (opcional)"
        />

        <Text style={styles.label}>Departamento *</Text>
        <View style={styles.pickerContainer}>
          <ScrollView style={styles.pickerScroll}>
            <TouchableOpacity
              style={[
                styles.pickerItem,
                viewModel.departmentId === "" && styles.pickerItemSelected,
              ]}
              onPress={() => (viewModel.departmentId = "")}
            >
              <Text
                style={[
                  styles.pickerItemText,
                  viewModel.departmentId === "" && styles.pickerItemTextSelected,
                ]}
              >
                Seleccione un departamento
              </Text>
            </TouchableOpacity>
            {viewModel.departments.map((dept) => (
              <TouchableOpacity
                key={dept.id}
                style={[
                  styles.pickerItem,
                  viewModel.departmentId === dept.id && styles.pickerItemSelected,
                ]}
                onPress={() => (viewModel.departmentId = dept.id || "")}
              >
                <Text
                  style={[
                    styles.pickerItemText,
                    viewModel.departmentId === dept.id &&
                      styles.pickerItemTextSelected,
                  ]}
                >
                  {dept.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        {viewModel.errors.departmentId && (
          <Text style={styles.errorText}>{viewModel.errors.departmentId}</Text>
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
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    maxHeight: 200,
    overflow: "hidden",
  },
  pickerScroll: {
    maxHeight: 200,
  },
  pickerItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  pickerItemSelected: {
    backgroundColor: "#007AFF",
  },
  pickerItemText: {
    fontSize: 16,
    color: "#333",
  },
  pickerItemTextSelected: {
    color: "white",
    fontWeight: "600",
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

export default EditarInsertarPersonas;
