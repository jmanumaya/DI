import { Pressable, Text } from "react-native";

type Props = {
  text: string;
  onPress: () => void;
};

export default function RoundedButton({ text, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#007bff",
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 30,
        alignItems: "center",
        width: "100%",
        marginTop: 15
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        {text}
      </Text>
    </Pressable>
  );
}
