import React from "react";
import { StyleSheet, Text } from "react-native";

import { User } from "../screens";
import { Button } from "../components";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation";

type UserStatusProps = {
  currentUser: User | null;
  navigation: StackNavigationProp<
    RootStackParamList,
    "Home" | "Restaurant" | "Booking"
  >;
};

export function UserStatus(props: UserStatusProps) {
  const { currentUser, navigation } = props;
  return (
    <>
      {currentUser ? (
        <Button mode="contained" onPress={() => navigation.navigate("Member")}>
          <Text>{`Hi ${currentUser.firstName}!`}</Text>
        </Button>
      ) : (
        <Button mode="contained" onPress={() => navigation.navigate("Login")}>
          <Text>Login</Text>
        </Button>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
