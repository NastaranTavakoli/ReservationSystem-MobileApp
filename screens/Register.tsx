import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export function RegisterScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Text>Register Screen</Text>
        <Button
        title="Register New User"
        onPress={() => navigation.navigate('Home')}
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