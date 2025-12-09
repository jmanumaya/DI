import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { AuthProvider } from './AuthContext';
import AuthStatus from './AuthStatus';

export default function App() {
  return (
    // El Proveedor debe envolver a los componentes que necesitan acceso a los datos
    <AuthProvider>
      <SafeAreaView style={styles.screen}>
        <Text style={styles.title}>Demo de Contexto</Text>
        <AuthStatus />
      </SafeAreaView>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  }
});