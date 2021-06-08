import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import moment from 'moment';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Button, Dialog, UserStatus } from '../components';
import { RootStackParamList } from '../navigation';

type BookingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Booking'>;
  route: RouteProp<RootStackParamList, 'Booking'>;
};

type Booking = {
  name: string;
  guests: number;
  startTime: string;
  confirmationCode: string;
  fullName: string;
};

export const BookingScreen: React.FC<BookingScreenProps> = ({
  navigation,
  route,
}) => {
  const { sittingId, guests, selectedDate, selectedTime, currentUser } =
    route.params;

  const [firstName, setFirstName] = useState(currentUser?.firstName || '');
  const [lastName, setLastName] = useState(currentUser?.lastName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [notes, setNotes] = useState('');
  const [visible, setVisible] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState('');

  const onCreateReservation = () => {
    axios
      .post(
        `https://placeholder-reservations.azurewebsites.net/api/reservations`,
        {
          firstName,
          lastName,
          email,
          phone,
          sittingId,
          guests,
          selectedDate: selectedDate.toLocaleDateString(),
          selectedTime,
        }
      )
      .then(({ data }) => {
        setBooking(data);
        setVisible(true);
        setError('');
      })
      .catch(err => {
        if (err.response) {
          if (err.response.data) {
            setError(err.response.data.title);
          } else {
            setError('Something went wrong');
          }
        } else {
          setError('Check the network connection');
        }
      });
  };

  const hideModal = () => {
    setVisible(false);
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <UserStatus currentUser={currentUser} navigation={navigation} />
        <View>
          <View style={styles.inputContainer}>
            <TextInput
              value={firstName}
              onChangeText={setFirstName}
              placeholder='First Name'
            ></TextInput>
            <TextInput
              value={lastName}
              onChangeText={setLastName}
              placeholder='Last Name'
            ></TextInput>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder='Email'
            ></TextInput>
            <TextInput
              value={phone}
              onChangeText={setPhone}
              placeholder='Phone'
            ></TextInput>
            <TextInput
              value={notes}
              onChangeText={setNotes}
              placeholder='Notes'
            ></TextInput>
          </View>
          <View>
            <Button mode='contained' onPress={onCreateReservation}>
              <Text>Create Reservation</Text>
            </Button>
          </View>
        </View>
        </ScrollView>
        <View>{error ? <Text>{error}</Text> : null}</View>
        {booking && (
          <Dialog
            visible={visible}
            onDismiss={hideModal}
            title={`Reservation for restaurant ${booking.name}`}
          >
            <Text>
              Date and Time:{' '}
              {moment(booking.startTime).format('Do MMM YYYY, h:mm a')}
            </Text>
            <Text>Guests: {booking.guests}</Text>
            <Text>Name: {booking.fullName}</Text>
            <Text>Confirmation Code: {booking.confirmationCode}</Text>
          </Dialog>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginVertical: 5,
  },
});
