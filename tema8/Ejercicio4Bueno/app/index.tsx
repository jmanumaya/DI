import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👋 Bienvenido</Text>
        <Text style={styles.subtitle}>
          Gestión de Personas y Departamentos
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/personas")}
        >
          <View style={[styles.cardIcon, { backgroundColor: "#6366F1" }]}>
            <Text style={styles.cardIconText}>👥</Text>
          </View>
          <Text style={styles.cardTitle}>Personas</Text>
          <Text style={styles.cardDescription}>
            Gestiona el listado de personas, añade nuevas o edita las existentes.
          </Text>
          <View style={styles.cardButton}>
            <Text style={styles.cardButtonText}>Ver listado →</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/departamentos")}
        >
          <View style={[styles.cardIcon, { backgroundColor: "#8B5CF6" }]}>
            <Text style={styles.cardIconText}>🏢</Text>
          </View>
          <Text style={styles.cardTitle}>Departamentos</Text>
          <Text style={styles.cardDescription}>
            Gestiona los departamentos de la organización.
          </Text>
          <View style={[styles.cardButton, { backgroundColor: "#8B5CF6" }]}>
            <Text style={styles.cardButtonText}>Ver listado →</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Información</Text>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            📅 <Text style={styles.bold}>Viernes y Sábado:</Text> Solo se muestran personas mayores de 18 años.
          </Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            🚫 <Text style={styles.bold}>Domingo:</Text> No está permitido eliminar personas.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 24,
    paddingTop: 40,
    backgroundColor: "#6366F1",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#E0E7FF",
  },
  cardsContainer: {
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  cardIconText: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  infoSection: {
    padding: 16,
    paddingBottom: 32,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: "#FEF3C7",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: "#92400E",
    lineHeight: 20,
  },
  bold: {
    fontWeight: "bold",
  },
});
