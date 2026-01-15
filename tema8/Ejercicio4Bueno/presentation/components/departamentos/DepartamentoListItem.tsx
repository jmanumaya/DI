import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DepartamentoUIModel } from "../../../presentation/models/DepartamentoUIModel";

interface DepartamentoListItemProps {
    departamento: DepartamentoUIModel;
    onPress: () => void;
    onDelete: () => void;
}

export const DepartamentoListItem: React.FC<DepartamentoListItemProps> = ({
    departamento,
    onPress,
    onDelete,
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.iconContainer, { backgroundColor: departamento.color || "#6366F1" }]}>
                <Text style={styles.iconText}>{departamento.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{departamento.name}</Text>
                <Text style={styles.id}>ID: {departamento.id}</Text>
            </View>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
                <Text style={styles.deleteText}>🗑️</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
    },
    iconText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    infoContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "600",
        color: "#1F2937",
        marginBottom: 4,
    },
    id: {
        fontSize: 12,
        color: "#6B7280",
    },
    deleteButton: {
        padding: 8,
    },
    deleteText: {
        fontSize: 20,
    },
});
