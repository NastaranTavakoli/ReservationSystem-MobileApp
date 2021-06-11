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
  ActivityIndicator,
  HelperText,
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
  const [invalidInput, setInvalidInput] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    guestsNumber.match(/^[0-9]+$/) == null || guestsNumber == ""
      ? setInvalidInput(true)
      : setInvalidInput(false);
    axios
      .get(
        `https://nastaran.azurewebsites.net/api/restaurants/${id}/availabilities`,
        {
          params: {
            SelectedDate: "07/06/21", //date.toLocaleDateString(),
            Guests: guestsNumber,
            Duration: 90,
          },
        }
      )
      .then(({ data }) => {
        setLoading(false);
        guestsNumber != "" ? setInvalidInput(false) : setInvalidInput(true);
        setAvailabilities(data);
        setError("");
      })
      .catch((err) => {
        setLoading(false);
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
          {invalidInput && (
            <HelperText style={styles.error} type="error" visible={true}>
              Invalid input for number of guests
            </HelperText>
          )}
          {error && !invalidInput ? (
            <HelperText style={styles.error} type="error" visible={true}>
              {error}
            </HelperText>
          ) : loading ? (
            <ActivityIndicator />
          ) : (
            <SafeAreaView>
              <Subheading>Available Time Slots</Subheading>
              {availabilities.length == 0 && !invalidInput ? (
                <HelperText style={styles.info} type="info" visible={true}>
                  No availabilities for the selected date
                </HelperText>
              ) : (
                <FlatList
                  data={availabilities}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.startTime}
                />
              )}
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
  error: {
    backgroundColor: "#EBDAE1",
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 5,
  },
  info: {
    backgroundColor: "#EBDAE1",
    margin: 5,
    fontWeight: "bold",
    textAlign: "center",
    borderRadius: 5,
  },
});
