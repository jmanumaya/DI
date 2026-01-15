import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonaUIModel } from "../../../presentation/models/PersonaUIModel";

interface PersonaListItemProps {
    persona: PersonaUIModel;
    onPress: () => void;
    onDelete: () => void;
}

export const PersonaListItem: React.FC<PersonaListItemProps> = ({
    persona,
    onPress,
    onDelete,
}) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={[styles.colorIndicator, { backgroundColor: persona.color || "#6366F1" }]} />
            <Image source={{ uri: persona.foto }} style={styles.avatar} />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{persona.name} {persona.surname}</Text>
                <Text style={styles.department}>{persona.departmentName}</Text>
                <Text style={styles.phone}>{persona.telefono}</Text>
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
    colorIndicator: {
        width: 4,
        height: "100%",
        borderRadius: 2,
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 12,
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
    department: {
        fontSize: 14,
        color: "#6366F1",
        fontWeight: "500",
        marginBottom: 2,
    },
    phone: {
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
