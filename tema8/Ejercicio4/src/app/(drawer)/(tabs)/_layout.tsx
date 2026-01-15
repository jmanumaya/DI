import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="personas"
        options={{
          title: "Gestión de Personas",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="departamentos"
        options={{
          title: "Gestión de Departamentos",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
