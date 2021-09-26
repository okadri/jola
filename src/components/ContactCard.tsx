import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from '../types/contact'


const ContactCard = ({item}: {item: Contact}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.contactCard} onPress={() => {
          navigation.navigate("SecondScreen");
        }}>
          <Text style={styles.contactName}>{item.name}</Text>
          <Text style={styles.contactAddress}>{item.street}, {item.city}, {item.zipcode}</Text>
        </TouchableOpacity>
      );  
};

const styles = StyleSheet.create({
    contactCard: {
      borderColor: '#4169e1',
      borderRadius: 10,
      borderStyle: 'solid',
      borderWidth: 1,
      padding: 10,
      marginBottom: 5,
    },
    contactName: {
      fontSize: 20,
      textAlign: 'left',
    },
    contactAddress: {
      fontSize: 12,
      textAlign: 'left',
    },
});

export default ContactCard;