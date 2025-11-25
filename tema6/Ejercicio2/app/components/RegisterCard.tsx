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
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        width: "100%",
        elevation: 10,
      }}
    >
      {children}
    </View>
  );
}
