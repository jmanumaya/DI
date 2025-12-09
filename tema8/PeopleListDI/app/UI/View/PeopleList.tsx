import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View, Platform, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { container } from "../../Core/container";
import { TYPES } from "../../Core/types";
import { Persona } from "../../Domain/Entities/Persona";
import { PeopleListVM } from "../VM/PeopleListVM";
import { observer } from "mobx-react-lite";

const viewModel = container.get<PeopleListVM>(TYPES.IndexVM);

// --- PALETA FUTURISTA ---
const NEON_CYAN = "#00fff9";
const NEON_PINK = "#ff00ff";
const DEEP_BG = "#050a14";
const CARD_BG = "rgba(10, 20, 40, 0.7)"; // Semitransparente

// --- COMPONENTES DECORATIVOS "TECH" ---

// Esquinas brillantes para dar efecto de "HUD"
const TechCorners = ({ color }: { color: string }) => (
  <>
    <View style={[styles.corner, styles.cornerTL, { borderColor: color }]} />
    <View style={[styles.corner, styles.cornerTR, { borderColor: color }]} />
    <View style={[styles.corner, styles.cornerBL, { borderColor: color }]} />
    <View style={[styles.corner, styles.cornerBR, { borderColor: color }]} />
  </>
);

// Avatar Digital
const CyberAvatar = ({ nombre, active }: { nombre: string; active: boolean }) => {
  const initial = nombre.charAt(0).toUpperCase();
  const glowColor = active ? NEON_PINK : NEON_CYAN;
  return (
    <View style={[styles.avatarContainer, { borderColor: glowColor, shadowColor: glowColor }]}>
      <Text style={[styles.avatarText, { color: glowColor }]}>{initial}</Text>
      {/* Línea de escaneo falsa */}
      <View style={[styles.scanLine, { backgroundColor: glowColor }]} />
    </View>
  );
};


const PeopleList = observer(() => {

  const renderItem = ({ item, index }: { item: Persona; index: number }) => {
    const isSelected = viewModel.personaSeleccionada?.id === item.id;
    const mainColor = isSelected ? NEON_PINK : NEON_CYAN;

    return (
      <Pressable
        onPress={() => { viewModel.personaSeleccionada = item; }}
        style={[
          styles.techCard,
          { borderColor: mainColor, shadowColor: mainColor },
          isSelected && styles.techCardSelected
        ]}
      >
        {/* Decoración de esquinas */}
        <TechCorners color={mainColor} />

        <View style={styles.cardInner}>
            {/* Índice estilo terminal */}
            <Text style={[styles.indexText, { color: mainColor }]}>
                {String(index + 1).padStart(2, '0')} //
            </Text>

            <CyberAvatar nombre={item.nombre} active={isSelected} />
            
            <View style={styles.infoContainer}>
            <Text style={[styles.techName, isSelected && { color: NEON_PINK, textShadowColor: NEON_PINK, textShadowRadius: 10 }]}>
                {item.nombre.toUpperCase()}
            </Text>
            <Text style={styles.techSurname}>
                {item.apellidos.toUpperCase()}
            </Text>
            <Text style={[styles.dataText, { color: mainColor }]}>
                STATUS: {isSelected ? "CONNECTED_Target Aquired" : "ONLINE_Standing By"}
            </Text>
            </View>
        </View>
        
        {/* Efecto de "Grid" de fondo en la tarjeta */}
        <View style={styles.gridOverlay} />
      </Pressable>
    );
  };

  return (
    <View style={styles.mainBackground}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        
        {/* HEADER TIPO TERMINAL */}
        <View style={styles.terminalHeader}>
            <Text style={styles.terminalSubtitle}>// SYSTEM_READY // UNIDAD_PERSONAS</Text>
            <Text style={styles.terminalTitle}>BASE DE DATOS</Text>
            <View style={styles.headerSeparator} />
        </View>

        {/* Feedback de selección Holográfico */}
        {viewModel.personaSeleccionada && (
            <View style={styles.holoBanner}>
                <Text style={styles.holoText}>
                    <Text style={{color: NEON_PINK}}>TARGET ACTIVADO: </Text> 
                    {viewModel.personaSeleccionada.nombre} {viewModel.personaSeleccionada.apellidos}
                </Text>
            </View>
        )}

        <FlatList
          data={viewModel.personasList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
      
      {/* Efecto de "Scanlines" global (líneas horizontales finas) */}
      <View style={styles.scanlineOverlay} pointerEvents="none" />
    </View>
  );
});

export default PeopleList;

// --- ESTILOS TIPO CYBERPUNK ---
const styles = StyleSheet.create({
  mainBackground: {
    flex: 1,
    backgroundColor: DEEP_BG,
  },
  container: {
    flex: 1,
  },
  listContent: {
    padding: 20,
    paddingBottom: 50,
  },

  // --- HEADER ---
  terminalHeader: {
      marginBottom: 20,
      paddingHorizontal: 20,
  },
  terminalSubtitle: {
      color: NEON_CYAN,
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 12,
      letterSpacing: 2,
      opacity: 0.8,
      marginBottom: 5,
  },
  terminalTitle: {
      color: "white",
      fontSize: 32,
      fontWeight: "900",
      letterSpacing: 3,
      textShadowColor: NEON_CYAN,
      textShadowRadius: 15,
      fontStyle: 'italic',
  },
  headerSeparator: {
      height: 2,
      backgroundColor: NEON_CYAN,
      width: 100,
      marginTop: 10,
      shadowColor: NEON_CYAN,
      shadowRadius: 10,
      shadowOpacity: 1,
  },

  // --- HOLO BANNER ---
  holoBanner: {
      marginHorizontal: 20,
      marginBottom: 20,
      padding: 15,
      backgroundColor: 'rgba(255, 0, 255, 0.1)',
      borderWidth: 1,
      borderColor: NEON_PINK,
      borderStyle: 'dashed',
  },
  holoText: {
      color: "white",
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 14,
  },

  // --- TECH CARD (EL ÍTEM) ---
  techCard: {
    backgroundColor: CARD_BG,
    marginBottom: 20,
    borderWidth: 1,
    borderRadius: 4, // Bordes casi rectos
    overflow: 'hidden',
    // El "Glow" principal
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 10, // Para Android (el color de sombra no siempre funciona bien en versiones antiguas)
  },
  techCardSelected: {
      backgroundColor: 'rgba(255, 0, 255, 0.15)', // Tinte rosa al seleccionar
  },
  cardInner: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 20,
      zIndex: 2,
  },
  gridOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.1,
      zIndex: 1,
      // Un truco para simular una rejilla con bordes punteados
      borderWidth: 1,
      borderColor: 'white',
      borderStyle: 'dotted',
      transform: [{ scale: 2 }]
  },

  // --- ESQUINAS TECH ---
  corner: {
      position: 'absolute',
      width: 15,
      height: 15,
      borderColor: NEON_CYAN,
      zIndex: 3,
  },
  cornerTL: { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 },
  cornerTR: { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 },
  cornerBL: { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 },
  cornerBR: { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 },


  // --- CONTENIDO ---
  indexText: {
      fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
      fontSize: 14,
      marginRight: 15,
      fontWeight: 'bold',
  },
  infoContainer: {
      flex: 1,
      marginLeft: 20,
  },
  techName: {
      color: "white",
      fontSize: 20,
      fontWeight: "900",
      letterSpacing: 2,
  },
  techSurname: {
    color: "#rgba(255,255,255,0.7)",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    marginBottom: 8,
  },
  dataText: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 10,
  },

  // --- CYBER AVATAR ---
  avatarContainer: {
      width: 60,
      height: 60,
      borderWidth: 2,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      shadowOffset: {width: 0, height:0},
      shadowOpacity: 1,
      shadowRadius: 10,
      overflow: 'hidden',
  },
  avatarText: {
      fontSize: 28,
      fontWeight: 'bold',
  },
  scanLine: {
      position: 'absolute',
      width: '100%',
      height: 2,
      top: '50%',
      opacity: 0.5,
  },

  // --- OVERLAY GLOBAL ---
  scanlineOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'transparent',
    borderTopWidth: 1, // Simula líneas de escaneo muy sutiles
    borderColor: 'rgba(0, 255, 249, 0.05)',
    zIndex: 999,
  },
});