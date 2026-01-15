import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PersonaUIModel } from "../../../presentation/models/PersonaUIModel";

interface PersonaListItemProps {
  persona: PersonaUIModel;
  onPress: (persona: PersonaUIModel) => void;
  onLongPress: (id: string) => void;
}

export const PersonaListItem: React.FC<PersonaListItemProps> = ({
  persona,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { borderLeftColor: persona.color }]}
      onPress={() => onPress(persona)}
      onLongPress={() => onLongPress(persona.id || "")}
    >
      {persona.foto && (
        <Image source={{ uri: persona.foto }} style={styles.foto} />
      )}
      <View style={styles.content}>
        <Text style={styles.nombre} numberOfLines={1}>
          {persona.nombre}
        </Text>
        <Text style={styles.edad}>{persona.edad} años</Text>
        {persona.nombreDepartamento && (
          <Text style={styles.departamento}>{persona.nombreDepartamento}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderLeftWidth: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  foto: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
    backgroundColor: "#f0f0f0",
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  edad: {
    fontSize: 13,
    color: "#666",
    marginBottom: 2,
  },
  departamento: {
    fontSize: 12,
    color: "#999",
    fontStyle: "italic",
  },
});
