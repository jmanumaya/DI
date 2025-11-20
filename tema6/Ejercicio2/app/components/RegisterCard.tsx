import { View } from "react-native";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RegisterCard({ children }: Props) {
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 25,
        borderRadius: 20,
        width: "90%",
        marginTop: 40,
        elevation: 5
      }}
    >
      {children}
    </View>
  );
}
