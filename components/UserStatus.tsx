import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
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

  const logOut = async () => {
    await AsyncStorage.clear();
    navigation.navigate("Login");
  };

  return (
    <>
      {currentUser ? (
        <>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Member")}
          >
            <Text>{`Hi ${currentUser.firstName}!`}</Text>
          </Button>
          <Button mode="contained" onPress={logOut}>
            <Text>Log Out</Text>
          </Button>
        </>
      ) : (
        <View>
          <Button mode="contained" onPress={() => navigation.navigate("Login")}>
            <Text>Login</Text>
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("Register")}
          >
            <Text>Register</Text>
          </Button>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({});
