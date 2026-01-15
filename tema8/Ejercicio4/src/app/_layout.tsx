import { Stack } from "expo-router";
import "reflect-metadata";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false }}
      />
    </Stack>
  );
}