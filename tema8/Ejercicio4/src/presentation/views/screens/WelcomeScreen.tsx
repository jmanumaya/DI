import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const WelcomeScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Personas y Departamentos</Text>
      <Text style={styles.subtitle}>
        Bienvenido a la aplicación de gestión
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/(drawer)/(tabs)")}
        >
          <Text style={styles.buttonText}>Gestionar Personas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.push("/(drawer)/departamentos")}
        >
          <Text style={styles.buttonText}>Gestionar Departamentos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonSecondary: {
    backgroundColor: "#5AC8FA",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});
