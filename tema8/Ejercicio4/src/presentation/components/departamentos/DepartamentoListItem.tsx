import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DepartamentoUIModel } from "../../../presentation/models/DepartamentoUIModel";

interface DepartamentoListItemProps {
  departamento: DepartamentoUIModel;
  onPress: (departamento: DepartamentoUIModel) => void;
  onLongPress: (id: string) => void;
}

export const DepartamentoListItem: React.FC<DepartamentoListItemProps> = ({
  departamento,
  onPress,
  onLongPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: departamento.color + "20" }]}
      onPress={() => onPress(departamento)}
      onLongPress={() => onLongPress(departamento.id || "")}
    >
      <View
        style={[styles.colorBadge, { backgroundColor: departamento.color }]}
      />
      <View style={styles.content}>
        <Text style={styles.nombre} numberOfLines={1}>
          {departamento.nombre}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 8,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  colorBadge: {
    width: 6,
    height: "100%",
    borderRadius: 3,
    marginRight: 12,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  nombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
});
