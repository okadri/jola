import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-ico-flags';
import { Contact } from '../types/contact';


const ContactCard = ({ item, isDarkMode }: { item: Contact, isDarkMode: boolean | undefined }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={styles.contactCard} onPress={() => {
            navigation.navigate("SecondScreen");
        }}>
                <Text
                    style={isDarkMode ? styles.contactNameDark : styles.contactNameLight}>
                        {item.name}
                </Text>
                <Text
                    style={isDarkMode ? styles.contactAddressDark : styles.contactAddressLight}>
                        {item.street}, {item.city}, {item.state} {item.zipcode}
                </Text>
                {item.country_of_origin ? 
                    <Icon
                        style={styles.flag}
                        name={item.country_of_origin.name.toLowerCase()}
                        width='30'
                        height='30'
                    />
                : null}
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
    flag : {
        opacity: 0.7,
        right: 10,
        top: '50%',
        position: 'absolute',
    }
  });

export default ContactCard;