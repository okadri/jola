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
                    style={[styles.name, isDarkMode ? styles.textDark : null]}>
                        {item.name}
                </Text>
                <Text
                    style={[styles.address, isDarkMode ? styles.textDark : null]}>
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
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
    },
    address: {
        fontSize: 12,
        textAlign: 'left',
    },
    textDark: {
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