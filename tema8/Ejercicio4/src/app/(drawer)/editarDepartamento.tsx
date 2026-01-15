import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
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
import { container } from "../../../../di/container";
import { TIPOS } from "../../../../di/types";
import { DepartamentoUIModel } from "../../../../presentation/models/DepartamentoUIModel";
import { DepartamentosViewModel } from "../../../../presentation/viewmodels/departamentos/DepartamentosViewModel";

export const EditarInsertarDepartamentoScreen: React.FC = observer(() => {
  const viewModel = container.get<DepartamentosViewModel>(
    TIPOS.DepartamentosViewModel
  );
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (viewModel.departamentoSeleccionado) {
      setNombre(viewModel.departamentoSeleccionado.nombre);
    }
  }, []);

  const validar = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;

    setIsSaving(true);
    try {
      const departamento = new DepartamentoUIModel(
        nombre,
        viewModel.departamentoSeleccionado?.id
      );

      if (viewModel.departamentoSeleccionado?.id) {
        await viewModel.actualizarDepartamento(departamento);
        Alert.alert("Éxito", "Departamento actualizado correctamente");
      } else {
        await viewModel.agregarDepartamento(departamento);
        Alert.alert("Éxito", "Departamento agregado correctamente");
      }

      router.back();
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelar = () => {
    viewModel.limpiarSeleccion();
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre del Departamento *</Text>
          <TextInput
            style={[styles.input, errors.nombre && styles.inputError]}
            placeholder="Ingrese el nombre del departamento"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#999"
          />
          {errors.nombre && (
            <Text style={styles.errorText}>{errors.nombre}</Text>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={handleGuardar}
            disabled={isSaving}
          >
            {isSaving ? (
              <ActivityIndicator color="white" />
            ) : (
              <>
                <Ionicons name="checkmark" size={20} color="white" />
                <Text style={styles.buttonText}>Guardar</Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSecondary]}
            onPress={handleCancelar}
            disabled={isSaving}
          >
            <Ionicons name="close" size={20} color="white" />
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#c62828",
  },
  errorText: {
    color: "#c62828",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonPrimary: {
    backgroundColor: "#007AFF",
  },
  buttonSecondary: {
    backgroundColor: "#999",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default EditarInsertarDepartamentoScreen;
