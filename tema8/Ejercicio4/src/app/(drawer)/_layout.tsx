import Ionicons from "@expo/vector-icons/Ionicons";
import { Drawer } from "expo-router/drawer";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Personas",
          title: "Gestión de Personas",
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="(tabs)/departamentos"
        options={{
          drawerLabel: "Departamentos",
          title: "Gestión de Departamentos",
          headerShown: true,
          drawerIcon: ({ color, size }) => (
            <Ionicons name="briefcase" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="editarPersona"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar Persona",
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="editarDepartamento"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar Departamento",
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
