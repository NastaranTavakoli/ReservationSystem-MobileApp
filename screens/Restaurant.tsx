import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { DateTimePicker, SearchBar, Card } from "../components";
import { RootStackParamList } from "../navigation";

type RestaurantScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Restaurant">;
  route: RouteProp<RootStackParamList, "Restaurant">;
};

export const RestaurantScreen: React.FC<RestaurantScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    date: passedDate,
    id,
    guestsNumber: passedGuestsNumber,
  } = route.params;

  const [date, setDate] = useState(passedDate);
  const [guestsNumber, setGuestsNumber] = useState(
    passedGuestsNumber.toString()
  );

  useEffect(() => {
    // axios
    //   .get("https://nastaran.azurewebsites.net/api/restaurants", {
    //     params: {
    //       SearchValue: searchTerm,
    //       Date: "07/06/21", //date.toLocaleDateString(),
    //       Time: "9:0", //`${time.getHours()}:${time.getMinutes()}`,
    //       Guests: guestsNumber,
    //       PageNumber: 1,
    //     },
    //   })
    //   .then(({ data }) => {
    //     setAvailableRestaurants(data.availableRestaurantsToShow);
    //     setRecentRestaurants(data.recentRestaurants);
    //   })
    //   .catch((err) => {});
  }, [date, guestsNumber]);

  return (
    <View style={styles.container}>
      <View>
        <Text>Details</Text>
        <DateTimePicker mode="date" initialValue={date} setValue={setDate} />
        <TextInput
          value={guestsNumber}
          onChangeText={setGuestsNumber}
        ></TextInput>
      </View>
      <View>
        <Text>{date.toLocaleDateString()}</Text>
        <Text>{guestsNumber}</Text>
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
