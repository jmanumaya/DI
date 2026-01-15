import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
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
import { container } from "../../di/container";
import { TYPES } from "../../di/types";
import { DepartamentoListItem } from "../../presentation/components/departamentos/DepartamentoListItem";
import { DepartamentoUIModel } from "../../presentation/models/DepartamentoUIModel";
import { DepartamentosViewModel } from "../../presentation/viewmodels/departamentos/DepartamentosViewModel";

export default function ListadoDepartamentosScreen() {
    const router = useRouter();
    const [viewModel] = useState(() => container.get<DepartamentosViewModel>(TYPES.DepartamentosViewModel));
    const [, forceUpdate] = useState({});

    const refresh = useCallback(() => forceUpdate({}), []);

    useEffect(() => {
        const unsubscribe = viewModel.subscribe(refresh);
        viewModel.loadDepartamentos();
        return unsubscribe;
    }, [viewModel, refresh]);

    const handleDelete = async (id: number) => {
        Alert.alert(
            "Confirmar eliminación",
            "¿Estás seguro de que quieres eliminar este departamento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        const success = await viewModel.deleteDepartamento(id);
                        if (!success && viewModel.error) {
                            Alert.alert("Error", viewModel.error);
                            viewModel.clearError();
                        }
                    },
                },
            ]
        );
    };

    const handlePress = (departamento: DepartamentoUIModel) => {
        viewModel.selectDepartamento(departamento);
        router.push(`/departamentos/${departamento.id}`);
    };

    const handleAdd = () => {
        viewModel.selectDepartamento(null);
        router.push("/departamentos/new");
    };

    const renderItem = ({ item }: { item: DepartamentoUIModel }) => (
        <DepartamentoListItem
            departamento={item}
            onPress={() => handlePress(item)}
            onDelete={() => handleDelete(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="🔍 Buscar departamento..."
                    placeholderTextColor="#9CA3AF"
                    value={viewModel.searchQuery}
                    onChangeText={(text) => viewModel.setSearchQuery(text)}
                />
            </View>

            {viewModel.isLoading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8B5CF6" />
                    <Text style={styles.loadingText}>Cargando departamentos...</Text>
                </View>
            ) : viewModel.error ? (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>❌ {viewModel.error}</Text>
                    <TouchableOpacity
                        style={styles.retryButton}
                        onPress={() => viewModel.loadDepartamentos()}
                    >
                        <Text style={styles.retryText}>Reintentar</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={viewModel.departamentos}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.emptyContainer}>
                            <Text style={styles.emptyText}>No hay departamentos</Text>
                        </View>
                    }
                />
            )}

            <TouchableOpacity style={styles.fab} onPress={handleAdd}>
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
    searchContainer: {
        padding: 16,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#E5E7EB",
    },
    searchInput: {
        backgroundColor: "#F3F4F6",
        borderRadius: 12,
        padding: 12,
        fontSize: 16,
        color: "#1F2937",
    },
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingText: {
        marginTop: 12,
        fontSize: 16,
        color: "#6B7280",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    errorText: {
        fontSize: 16,
        color: "#EF4444",
        textAlign: "center",
        marginBottom: 16,
    },
    retryButton: {
        backgroundColor: "#8B5CF6",
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
    },
    retryText: {
        color: "#FFFFFF",
        fontWeight: "600",
    },
    listContent: {
        paddingVertical: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 48,
    },
    emptyText: {
        fontSize: 16,
        color: "#6B7280",
    },
    fab: {
        position: "absolute",
        right: 24,
        bottom: 24,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: "#8B5CF6",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#8B5CF6",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    fabText: {
        fontSize: 32,
        color: "#FFFFFF",
        lineHeight: 36,
    },
});
