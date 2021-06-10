import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import {
  DateTimePicker,
  Button,
  UserStatus,
  TextInput,
  SearchBar,
  Table,
  Card,
  Subheading,
} from "../components";
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
    restaurant: { id, name, address, phone, email, photos },
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
      .get(
        `https://placeholder-reservations.azurewebsites.net/api/restaurants/${id}/availabilities`,
        {
          params: {
            SelectedDate: "07/06/21", //date.toLocaleDateString(),
            Guests: guestsNumber,
            Duration: 90,
          },
        }
      )
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
    console.log(startTime);
    console.log(moment(new Date(startTime)).format("HH:mm:ss"));
    return (
      <Button
        mode="contained"
        onPress={() => {
          navigation.navigate("Booking", {
            sittingId: id,
            guests: parseInt(guestsNumber),
            selectedDate: date,
            selectedTime: moment(startTime).format("HH:mm:ss"),
            currentUser,
          });
        }}
      >
        <Text>{moment(startTime).format("HH:mm A")}</Text>
      </Button>
    );
  };

  return (
    <View style={styles.container}>
      <UserStatus currentUser={currentUser} navigation={navigation} />
      <ScrollView>
        <Card
          includeBtn={false}
          title={name}
          contentTitle={address}
          paragraph={`${phone}\n ${email}`}
          uri={
            photos[0] ||
            "https://nastaran.azurewebsites.net/Uploads/Default/2ec96de6-a3e0-4d17-aec1-208e6c03cfd3.png"
          }
        />

        <View style={styles.picker}>
          <DateTimePicker mode="date" initialValue={date} setValue={setDate} />

          <SearchBar
            placeholder="Number of guests"
            onChange={setGuestsNumber}
            value={guestsNumber}
            icon="account-multiple"
          />
        </View>
        <View style={styles.body}>
          {error ? (
            <Text>{error}</Text>
          ) : (
            <SafeAreaView>
              <Subheading>Available Time Slots:</Subheading>
              <FlatList
                data={availabilities}
                renderItem={renderItem}
                keyExtractor={(item) => item.startTime}
              />
            </SafeAreaView>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  body: {
    flex: 1,
    margin: 20,
    marginTop: 5,
  },
});
