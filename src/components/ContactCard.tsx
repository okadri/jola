import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from "../store/contact/model";
import { Avatar, themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../store/contact/actions";

const ContactCard = ({ item }: { item: Contact }) => {
    const navigation = useNavigation();
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();

    const displayContact = () => {
        dispatch(setCurrentContact(item));
        navigation.navigate("Contact Screen");
    }
    return (
        <Pressable style={[styles.contactCard, isDarkmode ? styles.bgDark : styles.bgLight]} onPress={() => displayContact() }>
                <Text
                    style={[styles.name, isDarkmode ? styles.textDark : null]}>
                        {item.name}
                </Text>
                <Text
                    style={[styles.address, isDarkmode ? styles.textDark : null]}>
                        {item.street}, {item.city}, {item.state} {item.zipcode}
                </Text>
                {item.languages?.length ? 
                    <Text
                        style={[styles.address, isDarkmode ? styles.textDark : null]}>
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
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        padding: 10,
        marginBottom: 5,
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
    bgDark: {
        backgroundColor: themeColor.dark100,
    },
    bgLight: {
        backgroundColor: themeColor.white100,
    },
    flag : {
        right: 10,
        top: '30%',
        position: 'absolute',
    }
  });

export default ContactCard;