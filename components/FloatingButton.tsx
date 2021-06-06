import React from "react";
import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";
import { IconSource } from "react-native-paper/lib/typescript/components/Icon";

type FloatingButtonProps = {
  icon: IconSource;
  color?: string;
  onPress: () => void;
};

export const FloatingButton = ({
  icon,
  onPress,
  color = "blue",
}: FloatingButtonProps) => (
  <FAB style={styles.fab} small icon={icon} onPress={onPress} color={color} />
);

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
