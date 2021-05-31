import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function LoginScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Button
        title="Login"
        onPress={() => navigation.navigate('Home')}
      />
        <Button
        title="Register"
        onPress={() => navigation.navigate('Register')}
      />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
  });