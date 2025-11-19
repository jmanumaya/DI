import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { TarjetaProducto } from "../app/components/TarjetaProducto";
import { CartIcon } from "../app/components/CartIcon";

export default function Index() {
  const [cartCount, setCartCount] = useState(0);

  // Ejemplo de productos
  const productos = [
    {
      id: "1",
      name: "Wireless Earbuds",
      price: 79.99,
      image: require("../assets/images/buds.jpg"),
    },
    {
      id: "2",
      name: "Compact Dron",
      price: 349.99,
      image: require("../assets/images/reloj.jpg"),
    },
    {
      id: "3",
      name: "Gaming Keyboard",
      price: 129.99,
      image: require("../assets/images/buds.jpg"),
    },
    {
      id: "4",
      name: "Smartwatch X",
      price: 185.99,
      image: require("../assets/images/reloj.jpg"),
    },
  ];

  const handleAddToCart = () => {
    setCartCount((c) => c + 1);
  };

  return (
    <View style={styles.container}>
      {}
      <View style={styles.header}>
        <Text style={styles.title}>Nuestros Productos</Text>
        <CartIcon count={cartCount} onPress={() => alert("Ir al carrito")} />
      </View>

      <ScrollView contentContainerStyle={styles.grid} showsVerticalScrollIndicator={false}>
        {productos.map((p) => (
          <TarjetaProducto
            key={p.id}
            name={p.name}
            price={p.price}
            image={p.image}
            onAddToCart={handleAddToCart}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 14,
    backgroundColor: "#f2f2f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 14,
    justifyContent: "center",
    paddingBottom: 40,
  },
});
