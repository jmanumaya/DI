import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Register() {
  return (
    <>
      <Stack.Screen
        options={{
          title: "Nuevo usuario",
          headerBackVisible: true
        }}
      />

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 22 }}>Página de registro</Text>
      </View>
    </>
  );
}
