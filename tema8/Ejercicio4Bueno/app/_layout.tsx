import { Drawer } from "expo-router/drawer";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Drawer
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6366F1",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          drawerActiveBackgroundColor: "#6366F1",
          drawerActiveTintColor: "#FFFFFF",
          drawerInactiveTintColor: "#1F2937",
          drawerLabelStyle: {
            fontSize: 16,
            fontWeight: "500",
          },
          drawerStyle: {
            backgroundColor: "#F9FAFB",
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "🏠 Inicio",
            title: "Bienvenida",
          }}
        />
        <Drawer.Screen
          name="personas/index"
          options={{
            drawerLabel: "👥 Personas",
            title: "Listado de Personas",
          }}
        />
        <Drawer.Screen
          name="personas/[id]"
          options={{
            drawerLabel: "➕ Nueva Persona",
            title: "Editar/Insertar Persona",
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="departamentos/index"
          options={{
            drawerLabel: "🏢 Departamentos",
            title: "Listado de Departamentos",
          }}
        />
        <Drawer.Screen
          name="departamentos/[id]"
          options={{
            drawerLabel: "➕ Nuevo Departamento",
            title: "Editar/Insertar Departamento",
            drawerItemStyle: { display: "none" },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
