import { Text, View } from "react-native";
import { Link, router } from "expo-router";
import RoundedButton from "./components/RoundedButton";
import RegisterCard from "./components/RegisterCard";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0"
      }}
    >
      <RegisterCard>
        <Text style={{ fontSize: 20, marginBottom: 20, fontWeight: "bold" }}>
          Login
        </Text>

        <RoundedButton
          text="Entrar"
          onPress={() => router.push("/home")}
        />

        <Link
          href="/register"
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "#007bff",
            fontSize: 16
          }}
        >
          Regístrate
        </Link>
      </RegisterCard>
    </View>
  );
}
