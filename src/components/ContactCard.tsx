import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from "../store/contact/model";
import { Text, Avatar, themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../store/contact/actions";

const ContactCard = ({ item }: { item: Contact }) => {
    const navigation = useNavigation();
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();

    const displayContact = () => {
        dispatch(setCurrentContact(item));
        navigation.navigate("ContactScreen");
    }
    return (
        <Pressable style={[styles.contactCard, isDarkmode ? styles.bgDark : styles.bgLight]} onPress={() => displayContact()}>
            <Text style={styles.name}>
                {item.name}
            </Text>
            <Text style={styles.address}>
                {item.street}, {item.city}, {item.state} {item.zipcode}
            </Text>
            {item.languages?.length ?
                <Text style={styles.address}>
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
        padding: 10,
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        height: 75,
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
    },
    address: {
        fontSize: 12,
        textAlign: 'left',
    },
    bgDark: {
        backgroundColor: themeColor.dark100,
    },
    bgLight: {
        backgroundColor: themeColor.white100,
    },
    flag: {
        right: 10,
        top: '30%',
        position: 'absolute',
    }
});

export default ContactCard;