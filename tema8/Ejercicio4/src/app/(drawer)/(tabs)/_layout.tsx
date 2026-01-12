import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Listado de Personas",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
