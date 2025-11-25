import { View, Text, ImageBackground, Image } from "react-native";
import { Link, router } from "expo-router";
import RoundedButton from "./components/RoundedButton";
import RegisterCard from "./components/RegisterCard";

export default function Login() {
  return (
    <View style={{ flex: 1 }}>
      {/* Fondo con imagen */}
      <ImageBackground
        source={require("../assets/images/background.png")}
        style={{ flex: 1, width: "100%", height: "100%" }}
        resizeMode="cover"
      >
        {/* Logo */}
        <View style={{ alignItems: "center", marginTop: 80 }}>
          <Image
            source={require("../assets/images/icon.png")}
            style={{ width: 120, height: 120 }}
            resizeMode="contain"
          />
          <Text style={{ color: "white", fontSize: 24, marginTop: 10 }}>
            FOOD APP
          </Text>
        </View>

        {/* Tarjeta blanca */}
        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 30 }}>
          <RegisterCard>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                marginBottom: 20,
                textAlign: "center",
              }}
            >
              INGRESAR
            </Text>

            {/* Inputs falsos decorativos (ya que no piden funcionalidad) */}
            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
                marginBottom: 15,
              }}
            >
              <Text style={{ color: "#999" }}>Correo electrónico</Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderColor: "#ccc",
                borderRadius: 8,
                padding: 10,
              }}
            >
              <Text style={{ color: "#999" }}>Contraseña</Text>
            </View>

            <RoundedButton
              text="Entrar"
              onPress={() => router.push("/home")}
            />

            <Text style={{ marginTop: 10, textAlign: "center" }}>
              No tienes cuenta?{" "}
              <Link href="/register" style={{ color: "#ff8000" }}>
                Regístrate
              </Link>
            </Text>
          </RegisterCard>
        </View>
      </ImageBackground>
    </View>
  );
}
