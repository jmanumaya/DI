import { useLocalSearchParams, useRouter } from "expo-router";
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
import { container } from "../../di/container";
import { TYPES } from "../../di/types";
import { DepartamentosViewModel } from "../../presentation/viewmodels/departamentos/DepartamentosViewModel";

export default function EditarInsertarDepartamentoScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const isEditing = id !== "new" && id !== undefined;

    const [viewModel] = useState(() => container.get<DepartamentosViewModel>(TYPES.DepartamentosViewModel));

    const [name, setName] = useState("");
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (isEditing && viewModel.selectedDepartamento) {
            const departamento = viewModel.selectedDepartamento;
            setName(departamento.name);
        }
    }, [isEditing, viewModel.selectedDepartamento]);

    const handleSave = async () => {
        if (!name.trim()) {
            Alert.alert("Error", "El nombre es obligatorio");
            return;
        }

        setIsSaving(true);

        const departamentoData = {
            name: name.trim(),
        };

        let success: boolean;

        if (isEditing && viewModel.selectedDepartamento) {
            success = await viewModel.updateDepartamento(viewModel.selectedDepartamento.id, departamentoData);
        } else {
            success = await viewModel.addDepartamento(departamentoData);
        }

        setIsSaving(false);

        if (success) {
            router.back();
        } else if (viewModel.error) {
            Alert.alert("Error", viewModel.error);
            viewModel.clearError();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <View style={styles.iconContainer}>
                    <Text style={styles.iconText}>
                        {name ? name.charAt(0).toUpperCase() : "🏢"}
                    </Text>
                </View>

                <Text style={styles.label}>Nombre del Departamento *</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Ej: Recursos Humanos"
                    placeholderTextColor="#9CA3AF"
                />

                <TouchableOpacity
                    style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {isEditing ? "Actualizar" : "Crear"} Departamento
                        </Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => router.back()}
                >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    form: {
        padding: 24,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#8B5CF6",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 32,
    },
    iconText: {
        fontSize: 40,
        color: "#FFFFFF",
        fontWeight: "bold",
    },
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: "#374151",
        marginBottom: 8,
    },
    input: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        color: "#1F2937",
        marginBottom: 24,
    },
    saveButton: {
        backgroundColor: "#8B5CF6",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 12,
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
    },
    cancelButton: {
        backgroundColor: "#F3F4F6",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
    },
    cancelButtonText: {
        color: "#6B7280",
        fontSize: 16,
        fontWeight: "600",
    },
});
