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
        backgroundColor: "#ff8000",
        paddingVertical: 14,
        borderRadius: 30,
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
        {text}
      </Text>
    </Pressable>
  );
}
