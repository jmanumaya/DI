import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert, Picker,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { container } from "../../di/container";
import { TIPOS } from "../../di/types";
import { PersonaUIModel } from "../../presentation/models/PersonaUIModel";
import { DepartamentosViewModel } from "../../presentation/viewmodels/departamentos/DepartamentosViewModel";
import { PersonasViewModel } from "../../presentation/viewmodels/personas/PersonasViewModel";

export const EditarInsertarPersonaScreen: React.FC = observer(() => {
  const personasVM = container.get<PersonasViewModel>(TIPOS.PersonasViewModel);
  const departamentosVM = container.get<DepartamentosViewModel>(
    TIPOS.DepartamentosViewModel
  );
  const router = useRouter();

  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [foto, setFoto] = useState("");
  const [departamentoId, setDepartamentoId] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    departamentosVM.cargarDepartamentos();

    if (personasVM.personaSeleccionada) {
      const p = personasVM.personaSeleccionada;
      setNombre(p.nombre);
      setEdad(p.edad.toString());
      setFoto(p.foto || "");
      setDepartamentoId(p.departamentoId);
    }
  }, []);

  const validar = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    const edadNum = parseInt(edad);
    if (isNaN(edadNum) || edadNum <= 0) {
      newErrors.edad = "La edad debe ser mayor a 0";
    }

    if (!departamentoId) {
      newErrors.departamento = "Debe seleccionar un departamento";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;

    setIsSaving(true);
    try {
      const persona = new PersonaUIModel(
        nombre,
        parseInt(edad),
        departamentoId,
        foto,
        personasVM.personaSeleccionada?.id
      );

      if (personasVM.personaSeleccionada?.id) {
        await personasVM.actualizarPersona(persona);
        Alert.alert("Éxito", "Persona actualizada correctamente");
      } else {
        await personasVM.agregarPersona(persona);
        Alert.alert("Éxito", "Persona agregada correctamente");
      }

      router.back();
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelar = () => {
    personasVM.limpiarSeleccion();
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <View style={styles.section}>
          <Text style={styles.label}>Nombre *</Text>
          <TextInput
            style={[styles.input, errors.nombre && styles.inputError]}
            placeholder="Ingrese el nombre completo"
            value={nombre}
            onChangeText={setNombre}
            placeholderTextColor="#999"
          />
          {errors.nombre && (
            <Text style={styles.errorText}>{errors.nombre}</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Edad *</Text>
          <TextInput
            style={[styles.input, errors.edad && styles.inputError]}
            placeholder="Ingrese la edad"
            value={edad}
            onChangeText={setEdad}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />
          {errors.edad && <Text style={styles.errorText}>{errors.edad}</Text>}
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>URL de Foto</Text>
          <TextInput
            style={styles.input}
            placeholder="https://ejemplo.com/foto.jpg"
            value={foto}
            onChangeText={setFoto}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Departamento *</Text>
          <View
            style={[
              styles.picker,
              errors.departamento && styles.inputError,
            ]}
          >
            <Picker
              selectedValue={departamentoId}
              onValueChange={setDepartamentoId}
              style={{ color: "#333" }}
            >
              <Picker.Item label="Seleccione un departamento" value="" />
              {departamentosVM.departamentos.map((d) => (
                <Picker.Item
                  key={d.id}
                  label={d.nombre}
                  value={d.id}
                />
              ))}
            </Picker>
          </View>
          {errors.departamento && (
            <Text style={styles.errorText}>{errors.departamento}</Text>
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
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    backgroundColor: "#fff",
    overflow: "hidden",
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
