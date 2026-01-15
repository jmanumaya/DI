import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="apps" size={64} color="#007AFF" />
        <Text style={styles.title}>Gestión de Personas</Text>
        <Text style={styles.subtitle}>y Departamentos</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.description}>
          Bienvenido a la aplicación de gestión de personas y departamentos
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(drawer)/(tabs)/personas")}
        >
          <Ionicons name="person" size={24} color="white" />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Gestionar Personas</Text>
            <Text style={styles.buttonSubtitle}>
              Listar, crear, actualizar y eliminar
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.replace("/(drawer)/(tabs)/departamentos")}
        >
          <Ionicons name="briefcase" size={24} color="white" />
          <View style={styles.buttonTextContainer}>
            <Text style={styles.buttonTitle}>Gestionar Departamentos</Text>
            <Text style={styles.buttonSubtitle}>
              Listar, crear, actualizar y eliminar
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "space-between",
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginTop: 12,
  },
  subtitle: {
    fontSize: 20,
    color: "#666",
    marginTop: 4,
  },
  content: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    gap: 12,
    paddingBottom: 20,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    gap: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  buttonSecondary: {
    backgroundColor: "#5AC8FA",
  },
  buttonTextContainer: {
    flex: 1,
  },
  buttonTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
    marginBottom: 4,
  },
  buttonSubtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.8)",
  },
});
