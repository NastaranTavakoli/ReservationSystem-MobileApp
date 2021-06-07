import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  SafeAreaView,
} from "react-native";
import { DateTimePicker, Button, UserStatus } from "../components";
import { RootStackParamList } from "../navigation";

type RestaurantScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Restaurant">;
  route: RouteProp<RootStackParamList, "Restaurant">;
};

type Availability = {
  startTime: string;
  sittingStartTime: string;
  sittingEndTime: string;
  description: string;
  name: string;
  id: number;
};

export const RestaurantScreen: React.FC<RestaurantScreenProps> = ({
  navigation,
  route,
}) => {
  const {
    date: passedDate,
    guestsNumber: passedGuestsNumber,
    restaurant: { id, name, address, phone, email },
    currentUser,
  } = route.params;

  const [date, setDate] = useState(passedDate);
  const [guestsNumber, setGuestsNumber] = useState(
    passedGuestsNumber.toString()
  );
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`https://localhost:44336/api/restaurants/${id}/availabilities`, {
        params: {
          SelectedDate: "07/06/21", //date.toLocaleDateString(),
          Guests: guestsNumber,
          Duration: 90,
        },
      })
      .then(({ data }) => {
        setAvailabilities(data);
        setError("");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            setError(err.response.data.title);
          } else {
            setError("Something went wrong");
          }
        } else {
          setError("Check the network connection");
        }
      });
  }, [date, guestsNumber]);

  const renderItem = ({ item }: { item: Availability }) => {
    const {
      startTime,
      sittingStartTime,
      sittingEndTime,
      description,
      name,
      id,
    } = item;
    return (
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Booking", {
            sittingId: id,
            guests: parseInt(guestsNumber),
            selectedDate: date,
            selectedTime: moment(new Date(startTime)).format("HH:mm:ss"),
            currentUser,
          });
        }}
      >
        <Text>{moment(new Date(startTime)).format("HH:mm A")}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <UserStatus currentUser={currentUser} navigation={navigation} />
      <View>
        <Text>{name}</Text>
        <Text>{address}</Text>
        <Text>{phone}</Text>
        <Text>{email}</Text>
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
      {error ? (
        <Text>{error}</Text>
      ) : (
        <SafeAreaView>
          <FlatList
            data={availabilities}
            renderItem={renderItem}
            keyExtractor={(item) => item.startTime}
          />
        </SafeAreaView>
      )}
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
