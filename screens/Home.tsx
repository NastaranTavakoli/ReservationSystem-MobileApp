import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
 
export function HomeScreen({ navigation }) {


  
    return (
      <View style={styles.container}>

        <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />
        <View>
        <Text>Make a reservation now</Text>
        <Text>Query</Text>
        </View>
        <View>

        </View>


      
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