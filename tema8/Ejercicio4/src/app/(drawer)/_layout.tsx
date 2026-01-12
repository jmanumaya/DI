// src/app/(drawer)/_layout.tsx

import { Drawer } from "expo-router/drawer";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function DrawerLayout() {
  return (
    <Drawer>
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: "Personas",
          title: "Personas",
          headerShown: false,
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="departamentos"
        options={{
          drawerLabel: "Departamentos",
          title: "Listado de Departamentos",
          headerShown: true,
          drawerIcon: ({ color, size }: { color: string; size: number }) => (
            <Ionicons name="business-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="editarInsertarPersonas"
        options={{
          drawerItemStyle: { display: "none" }, // Ocultar del drawer
          title: "Editar Persona",
          headerShown: true,
        }}
      />
      <Drawer.Screen
        name="editarInsertarDepartamento"
        options={{
          drawerItemStyle: { display: "none" }, // Ocultar del drawer
          title: "Editar Departamento",
          headerShown: true,
        }}
      />
    </Drawer>
  );
}
