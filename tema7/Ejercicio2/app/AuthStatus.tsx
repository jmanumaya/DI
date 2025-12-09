import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
// Importamos nuestro hook personalizado (o el contexto directamente)
import { useAuth } from './AuthContext'; 

const AuthStatus = () => {
  // Lectura de Estado directamente desde el Contexto
  const { isLoggedIn, userName, loginUser, logoutUser } = useAuth();

  // Nombre fijo para el ejemplo
  const MY_NAME = "Josema"; 

  return (
    <View style={styles.container}>
      {/* Visualización del Estado General */}
      <Text style={styles.statusHeader}>
        {isLoggedIn ? "✅ Conectado" : "❌ Desconectado"}
      </Text>

      {/* Visualización del Nombre del Usuario (Solo si está conectado) */}
      {isLoggedIn && (
        <Text style={styles.userText}>
          Usuario: <Text style={{ fontWeight: 'bold' }}>{userName}</Text>
        </Text>
      )}

      {/* Botón Dinámico con espaciado */}
      <View style={styles.buttonContainer}>
        <Button
          title={isLoggedIn ? "Cerrar Sesión" : "Iniciar Sesión"}
          onPress={isLoggedIn ? logoutUser : () => loginUser(MY_NAME)}
          color={isLoggedIn ? "red" : "green"}
        />
      </View>
    </View>
  );
};

// Estilos simples para mejorar la visualización
const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    margin: 20,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
  },
  statusHeader: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: '600',
    color: '#333',
  },
  userText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  buttonContainer: {
    marginTop: 10,
    width: '100%',
  }
});

export default AuthStatus;