import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "../components";

export function LoginScreen({
  navigation,
}: {
  navigation: StackNavigationProp<Record<string, object | undefined>, "Login">;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login() {
    try {
      setLoading(true);
      const loginResponse = await axios.post(
        "https://localhost:44336/api/accounts/login",
        {
          email,
          password,
        }
      );
      const token = loginResponse.data.token;
      await AsyncStorage.setItem("authToken", `Bearer ${token}`);
      const tokenFromStorage = await AsyncStorage.getItem("authToken");
      const userProfileResponse = await axios.get(
        "https://localhost:44336/api/accounts",
        {
          headers: {
            Authorization: tokenFromStorage,
          },
          withCredentials: true,
        }
      );
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(userProfileResponse.data)
      );
      setLoading(false);
      navigation.replace("Home");
    } catch (err) {
      setLoading(false);
      if (err.response) {
        console.log(err.response);
        setError(err.response.data[''].join('\n'));
      }
      setError(String(err));
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput label="Email" onChangeText={setEmail} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          label="Password"
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button mode="outlined" onPress={login} loading={loading}>
          Login
        </Button>
      </View>
      <View>{error ? <Text>{error}</Text> : null}</View>
      <View style={styles.registerView}>
        <View>
          <Text>Don't have an account?</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button onPress={() => navigation.push("Register")}>
            Register here.
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    marginVertical: 5,
  },
  buttonContainer: {
    marginVertical: 5,
  },
  registerView: {
    marginTop: 10
  }
});
