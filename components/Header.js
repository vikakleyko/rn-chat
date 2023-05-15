import { Text, View, StyleSheet } from "react-native";
import { HeaderHeight } from "../lib/consts";

export const Header = () => {
  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>React Native Chat</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  HeaderContainer: {
    alignItems: "center",
    backgroundColor: "white",
    display: "flex",
    height: HeaderHeight,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
  },
  HeaderText: {
    paddingTop: 40,
  },
});
