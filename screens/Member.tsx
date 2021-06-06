import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { List } from 'react-native-paper';
import moment from 'moment';

import { ActivityIndicator, Button, Dialog, Paragraph, TextInput } from '../components';
import { getAllReservations, getReservationById, requestUpdate } from '../services/memberReservations';
import { RootStackParamList } from "../navigation";

type MemberScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, "Member">;
};

export const MemberScreen: React.FC<MemberScreenProps> = ({ navigation }) => {
  const [details, setDetails] = useState({});
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(false);
  const [nextReservations, setNextReservations] = useState<Array<string | number>>([]);
  const [pastReservations, setPastReservations] = useState<Array<string | number>>([]);
  const [visible, setVisible] = useState(false);

  const[duration, setDuration] = useState("");
  const[email, setEmail] = useState("");
  const[guests, setGuests] = useState("");
  const[id, setId] = useState("");
  const[notes, setNotes] = useState("");
  const[phone, setPhone] = useState("");
  const[startTime, setStartTime] = useState("");

  useEffect(() => {
    setLoading(true);
    getAllReservations().then((data: Array<string | number>) => {
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

  const renderReservation = (props : any) => {
    useEffect(() => {
      setDuration(props.duration);
      setEmail(props.email);
      setGuests(props.guests);
      setId(props.id);
      setNotes(props.notes);
      setPhone(props.phone);
      setStartTime(props.startTime);
    },[props]);
    if (props != null && new Date(props.startTime) > new Date()) {
      return (
        <Dialog 
          visible={visible} 
          onDismiss={() => setVisible(false)} 
          title={`Reservation for ${props.restaurantName}`} 
        >
            <TextInput label="Date" placeholder='Date' value={startTime} onChangeText={startTime => setStartTime(startTime)}/>
            <TextInput label="Duration" placeholder='Duration' value={duration} onChangeText={duration => setDuration(duration)}/>
            <TextInput label="Guests" placeholder='Guests' value={guests} onChangeText={guests => setGuests(guests)}/>
            <TextInput label="Email" placeholder='Email' value={email} onChangeText={email => setEmail(email)}/>
            <TextInput label="Phone" placeholder='Phone' value={phone} onChangeText={phone => setPhone(phone)}/>
            <TextInput label="Notes" placeholder='Notes' editable={false} multiline={true} value={notes}/>
            <Button mode="outlined" onPress={() => requestOnPress("update")}>Request Update</Button>
            <Button mode="outlined" onPress={() => requestOnPress("cancel")}>Request Cancellation</Button>
        </Dialog>
      )
    }
    else if (props != null && new Date(props.startTime) <= new Date()) {
      return (
        <Dialog 
          visible={visible} 
          onDismiss={() => setVisible(false)} 
          title={`Reservation for ${props.restaurantName}`}
        >
          <Paragraph>{`Date: ${moment(props.startTime).format('Do MMM YYYY, h:mm a')}\nDuration: ${props.duration}\nGuests: ${props.guests}\nEmail: ${props.email}\nPhone: ${props.phone}`}</Paragraph>
          <Button onPress={() => setVisible(false)}>Done</Button>
        </Dialog>
      )
    }
  }

  const renderReservations = (props: Array<string | number>) => {
    if (props.length != 0) {
      return props.map((r: any) => (
        <List.Item key={r.id} right={() => <Button onPress={() => detailsOnPress(r.id)}>Details</Button>} title={moment(r.startTime).format('Do MMM YYYY, h:mm a')} description={`Venue: ${r.restaurant}\nState: ${r.status}`} />
      ));
    } else {
      return <List.Item title="No Reservations" />;
    }
  }

  const requestOnPress = (button: string) => {
    const details = {
      duration: duration, email: email, guests: guests, id: id, notes: notes, phone: phone, requestType: button=="update"?"update":"cancel", startTime: startTime,
    }
    const update = requestUpdate(details);
    navigation.replace("Member");
  }

  return (
    <View style={styles.container}>
      <Button mode='outlined' onPress={() => console.log("Book Now button pressed.")}>Book Now</Button>
      <List.Accordion title="Upcoming Reservations" expanded={expanded} onPress={() => setExpanded(!expanded)}>
        { loading ? <ActivityIndicator /> : renderReservations(nextReservations) }
      </List.Accordion>
      <List.Accordion title="Past Reservations">
        { loading ? <ActivityIndicator /> : renderReservations(pastReservations) }
      </List.Accordion>
      { renderReservation(details) }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

