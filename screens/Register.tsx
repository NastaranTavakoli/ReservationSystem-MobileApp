import axios from "axios";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput } from "../components";

export function RegisterScreen({ navigation }) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  async function register() {
    try {
      if (!firstName || !lastName || !email || !phone || !password || !confirmPassword) {
        setError('Please fill out each field');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const registerResponse = await axios.post('https://localhost:44336/api/accounts/register', {
        firstName,
        lastName,
        email,
        phone,
        password,
        confirmPassword
      });
      if (registerResponse.status != 200) {
        console.log(registerResponse);
        throw registerResponse.statusText;
      }
      const token = registerResponse.data.token;
      
    } catch (err) {
      console.log(err);
      setError(String(err));
    }    
  }

  return (
    <View style={styles.container}>
      <View>
        <TextInput />
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
});
