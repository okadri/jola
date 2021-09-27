import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from '../types/contact'


const ContactCard = ({item, isDarkMode}: {item: Contact, isDarkMode: string}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.contactCard} onPress={() => {
          navigation.navigate("SecondScreen");
        }}>
          <Text style={isDarkMode ? styles.contactNameDark : styles.contactNameLight}>{item.name}</Text>
          <Text style={isDarkMode ? styles.contactAddressDark : styles.contactAddressLight}>{item.street}, {item.city} {item.state}, {item.zipcode}</Text>
        </TouchableOpacity>
      );  
};

const styles = StyleSheet.create({
    contactCard: {
      borderColor: '#cecece',
      borderStyle: 'solid',
      borderBottomWidth: 1,
      padding: 10,
      marginTop: 10,
      marginBottom: 10,
    },
    contactNameLight: {
      fontSize: 20,
      textAlign: 'left',
    },
    contactAddressLight: {
      fontSize: 12,
      textAlign: 'left',
    },
    contactNameDark: {
      fontSize: 20,
      textAlign: 'left',
      color: '#eee'
    },
    contactAddressDark: {
      fontSize: 12,
      textAlign: 'left',
      color: '#eee'
    },
});

export default ContactCard;