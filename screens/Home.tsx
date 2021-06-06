import AsyncStorage from "@react-native-async-storage/async-storage";
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
import { DateTimePicker, SearchBar, Card, UserStatus } from "../components";
import { RootStackParamList } from "../navigation";

type HomeScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export type User = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phone: string;
};

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  photos: string[];
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [guestsNumber, setGuestsNumber] = useState("2");
  const [searchTerm, setSearchTerm] = useState("");
  const [availableRestaurants, setAvailableRestaurants] = useState<
    Restaurant[]
  >([]);
  const [recentRestaurants, setRecentRestaurants] = useState<Restaurant[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const tokenFromStorage = await AsyncStorage.getItem("authToken");

        const { data } = await axios.get(
          "https://nastaran.azurewebsites.net/api/accounts",
          {
            headers: {
              Authorization: tokenFromStorage,
            },
            withCredentials: true,
          }
        );

        setCurrentUser(data);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    axios
      .get("https://nastaran.azurewebsites.net/api/restaurants", {
        params: {
          SearchValue: searchTerm,
          Date: "07/06/21", //date.toLocaleDateString(),
          Time: "9:0", //`${time.getHours()}:${time.getMinutes()}`,
          Guests: guestsNumber,
          PageNumber: 1,
        },
      })
      .then(({ data }) => {
        setAvailableRestaurants(data.availableRestaurantsToShow);
        setRecentRestaurants(data.recentRestaurants);
      })
      .catch((err) => {});
  }, [date, time, guestsNumber, searchTerm]);

  const renderItem = ({ item }: { item: Restaurant }) => {
    const { name, address, photos, phone, id } = item;
    return (
      <Card
        title={name}
        contentTitle={address}
        paragraph={phone}
        uri={
          photos[0] ||
          "https://nastaran.azurewebsites.net/Uploads/Default/2ec96de6-a3e0-4d17-aec1-208e6c03cfd3.png"
        }
        btnTitle="Make a reservation"
        onPress={() =>
          navigation.navigate("Restaurant", {
            date,
            guestsNumber: parseInt(guestsNumber),
            restaurant: item,
            currentUser,
          })
        }
      />
    );
  };

  return (
    <View style={styles.container}>
      <UserStatus currentUser={currentUser} navigation={navigation} />
      <View>
        <Text>Make a reservation now</Text>
        <DateTimePicker mode="date" initialValue={date} setValue={setDate} />
        <DateTimePicker mode="time" initialValue={time} setValue={setTime} />
        <TextInput
          value={guestsNumber}
          onChangeText={setGuestsNumber}
        ></TextInput>
        <SearchBar
          placeholder="Location or Name"
          onChange={setSearchTerm}
          value={searchTerm}
          icon="magnify"
        />
      </View>
      <View>
        <Text>{date.toLocaleDateString()}</Text>
        <Text>{`${time.getHours()}:${time.getMinutes()}`}</Text>
        <Text>{guestsNumber}</Text>
        <SafeAreaView>
          <FlatList
            data={availableRestaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
        <Text>Recently-added Restaurants:</Text>
        <SafeAreaView>
          <FlatList
            data={recentRestaurants}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </SafeAreaView>
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
