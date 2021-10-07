import React from "react";
import { Text, StyleSheet } from "react-native";
import { Contact } from "../store/contact/model";
import { themeColor } from 'react-native-rapi-ui';

const ContactProfile = ({ contact, isDarkMode }: { contact: Contact, isDarkMode: boolean | undefined }) => {
    return (
        <Text
            style={[styles.name, isDarkMode ? styles.textDark : null]}>
                {contact.name}'s Profile
        </Text>
    );
};

const styles = StyleSheet.create({
    name: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 50,
    },
    textDark: {
        color: themeColor.white100,
    },
  });

export default ContactProfile;