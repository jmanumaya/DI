import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
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
import { PersonasViewModel } from "../../presentation/viewmodels/personas/PersonasViewModel";

export default function EditarInsertarPersonaScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const isEditing = id !== "new" && id !== undefined;

    const [personasVM] = useState(() => container.get<PersonasViewModel>(TYPES.PersonasViewModel));
    const [departamentosVM] = useState(() => container.get<DepartamentosViewModel>(TYPES.DepartamentosViewModel));
    const [, forceUpdate] = useState({});

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [telefono, setTelefono] = useState("");
    const [direccion, setDireccion] = useState("");
    const [foto, setFoto] = useState("");
    const [birth, setBirth] = useState("");
    const [departmentId, setDepartmentId] = useState<number>(1);
    const [isSaving, setIsSaving] = useState(false);

    const refresh = useCallback(() => forceUpdate({}), []);

    useEffect(() => {
        const unsubscribe = departamentosVM.subscribe(refresh);
        departamentosVM.loadDepartamentos();
        return unsubscribe;
    }, [departamentosVM, refresh]);

    useEffect(() => {
        if (isEditing && personasVM.selectedPersona) {
            const persona = personasVM.selectedPersona;
            setName(persona.name);
            setSurname(persona.surname);
            setTelefono(persona.telefono);
            setDireccion(persona.direccion);
            setFoto(persona.foto);
            setBirth(persona.birth.split("T")[0]);
            setDepartmentId(persona.departmentId);
        }
    }, [isEditing, personasVM.selectedPersona]);

    const handleSave = async () => {
        if (!name.trim() || !surname.trim()) {
            Alert.alert("Error", "El nombre y apellidos son obligatorios");
            return;
        }

        setIsSaving(true);

        const personaData = {
            name: name.trim(),
            surname: surname.trim(),
            telefono: telefono.trim(),
            direccion: direccion.trim(),
            foto: foto.trim() || "https://i.pravatar.cc/500",
            birth: birth || new Date().toISOString(),
            departmentId,
        };

        let success: boolean;

        if (isEditing && personasVM.selectedPersona) {
            success = await personasVM.updatePersona(personasVM.selectedPersona.id, personaData);
        } else {
            success = await personasVM.addPersona(personaData);
        }

        setIsSaving(false);

        if (success) {
            router.back();
        } else if (personasVM.error) {
            Alert.alert("Error", personasVM.error);
            personasVM.clearError();
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                {foto ? (
                    <Image source={{ uri: foto }} style={styles.avatar} />
                ) : (
                    <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarPlaceholderText}>📷</Text>
                    </View>
                )}

                <Text style={styles.label}>Nombre *</Text>
                <TextInput
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                    placeholder="Nombre"
                    placeholderTextColor="#9CA3AF"
                />

                <Text style={styles.label}>Apellidos *</Text>
                <TextInput
                    style={styles.input}
                    value={surname}
                    onChangeText={setSurname}
                    placeholder="Apellidos"
                    placeholderTextColor="#9CA3AF"
                />

                <Text style={styles.label}>Teléfono</Text>
                <TextInput
                    style={styles.input}
                    value={telefono}
                    onChangeText={setTelefono}
                    placeholder="Teléfono"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Dirección</Text>
                <TextInput
                    style={styles.input}
                    value={direccion}
                    onChangeText={setDireccion}
                    placeholder="Dirección"
                    placeholderTextColor="#9CA3AF"
                />

                <Text style={styles.label}>URL de Foto</Text>
                <TextInput
                    style={styles.input}
                    value={foto}
                    onChangeText={setFoto}
                    placeholder="https://..."
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Fecha de Nacimiento</Text>
                <TextInput
                    style={styles.input}
                    value={birth}
                    onChangeText={setBirth}
                    placeholder="YYYY-MM-DD"
                    placeholderTextColor="#9CA3AF"
                />

                <Text style={styles.label}>Departamento</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={departmentId}
                        onValueChange={(value) => setDepartmentId(value)}
                        style={styles.picker}
                    >
                        {departamentosVM.departamentos.map((dept) => (
                            <Picker.Item key={dept.id} label={dept.name} value={dept.id} />
                        ))}
                    </Picker>
                </View>

                <TouchableOpacity
                    style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.saveButtonText}>
                            {isEditing ? "Actualizar" : "Crear"} Persona
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
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: "center",
        marginBottom: 24,
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#E5E7EB",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 24,
    },
    avatarPlaceholderText: {
        fontSize: 40,
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
        marginBottom: 16,
    },
    pickerContainer: {
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 12,
        marginBottom: 24,
        overflow: "hidden",
    },
    picker: {
        height: 50,
    },
    saveButton: {
        backgroundColor: "#6366F1",
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
