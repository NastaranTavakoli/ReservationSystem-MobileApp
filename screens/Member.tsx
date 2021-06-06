import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { List } from 'react-native-paper';
import moment from 'moment';

import { RootStackParamList } from "../navigation";
import { getAllReservations, getReservationById } from '../services/memberReservations';
import { ActivityIndicator, Button, Dialog, Paragraph, Text, Title } from '../components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MemberScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Home">;
};

export const MemberScreen: React.FC<MemberScreenProps> = ({ navigation }) => {
  const [nextReservations, setNextReservations] = useState<string[] | number[]>([]);
  const [pastReservations, setPastReservations] = useState<string[] | number[]>([]);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllReservations().then((data: any) => {
      setLoading(false);
      const future = data.filter((d: any) => new Date(d.startTime) > new Date());
      setNextReservations(future);
      const past = data.filter((d: any) => new Date(d.startTime) <= new Date());
      setPastReservations(past);
    }).catch(error => {
      setLoading(false);
      alert("Something went wrong.");
    })
  }, []);

  const detailsOnPress = (id: number) => {
    getReservationById(id).then((data: any) => {
      setDetails(data);
      setVisible(true);
    }).catch(error => {
      alert("Something went wrong.");
    })
  } 

  function renderReservations(props: string[] | number[]) {
    if (props.length != 0) {
      return props.map((r: any) => (
        <List.Section key={r.id}>
          <List.Item right={props => <Button onPress={() => detailsOnPress(r.id)}>Details</Button>} title={moment(r.startTime).format('Do MMM YYYY, h:mm a')} description={r.restaurant}></List.Item>
        </List.Section>
      ));
    } else {
      return (
        <View>
          <Text>No Reservations</Text>
        </View>
      )
    }
  }

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  function renderReservation(props : any) {
    if (props != null) {
      return (
        <Dialog 
          visible={visible} 
          onDismiss={hideDialog} 
          title={`Reservation for ${props.restaurantName}`} 
          paragraph={`
          Date and Time: ${moment(props.startTime).format('Do MMM YYYY, h:mm a')}\n
          Duration: ${props.duration}\n
          Guests: ${props.guests}\n
          Email: ${props.email}\n
          Phone: ${props.phone}
          `}
          onPress={hideDialog}
          text='Done'
        ></Dialog>
      )
    }
  }

  return (
    <View style={styles.container}>
      <Button mode='outlined' onPress={() => console.log("Book Now button pressed.")}>Book Now</Button>
      <Title>Upcoming Reservations</Title>
      { loading ? <ActivityIndicator /> : renderReservations(nextReservations) }
      <Title>Past Reservations</Title>
      { loading ? <ActivityIndicator /> : renderReservations(pastReservations) }
      { renderReservation(details) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: 'white',
    margin: 0,
  }
})

