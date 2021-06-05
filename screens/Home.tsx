import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { DateTimePicker } from "../components";
import { RootStackParamList } from "../navigation";

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <View style={styles.container}>
      <Button title="Login" onPress={() => navigation.navigate("Login")} />
      <View>
        <Text>Make a reservation now</Text>
        <Text>Query</Text>
        <DateTimePicker mode="date" initialValue={date} setValue={setDate} />
        <DateTimePicker mode="time" initialValue={time} setValue={setTime} />
      </View>
      <View>
        <Text>{date.toDateString()}</Text>
        <Text>{`${time.getHours()}:${time.getMinutes()}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
