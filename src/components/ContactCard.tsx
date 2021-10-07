import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from "../store/contact/model";
import { Avatar, themeColor } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../store/contact/actions";

const ContactCard = ({ item, isDarkMode }: { item: Contact, isDarkMode: boolean | undefined }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const displayContact = () => {
        dispatch(setCurrentContact(item));
        navigation.navigate("Contact Screen");
    }
    return (
        // Consider Pressable
        <TouchableOpacity style={styles.contactCard} onPress={() => displayContact() }>
                <Text
                    style={[styles.name, isDarkMode ? styles.textDark : null]}>
                        {item.name}
                </Text>
                <Text
                    style={[styles.address, isDarkMode ? styles.textDark : null]}>
                        {item.street}, {item.city}, {item.state} {item.zipcode}
                </Text>
                {item.languages.length ? 
                    <Text
                        style={[styles.address, isDarkMode ? styles.textDark : null]}>
                            Languages: {item.languages.map(l => l.name).join(', ')}
                    </Text>
                : null}
                {item.country_of_origin ? 
                    <Avatar
                        style={styles.flag}
                        source={{ uri: `https://www.countryflags.io/${item.country_of_origin.code.toLowerCase()}/shiny/64.png` }}
                        size="md"
                        shape="rounded"
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
        color: themeColor.white100,
    },
    flag : {
        right: 10,
        top: '30%',
        position: 'absolute',
    }
  });

export default ContactCard;