import React from "react";
import { StyleSheet } from "react-native";
import { Contact } from "../store/contact/model";
import { Section, Text, TextInput, themeColor } from 'react-native-rapi-ui';

const ContactForm = ({ contact, isDarkMode }: { contact: Contact | undefined, isDarkMode: boolean | undefined }) => {
    const setName = (name: string) => console.log(name);

    return (
        <Section style={styles.section}>
            <Text style={{ marginBottom: 10 }}>Name</Text>
            <TextInput
                placeholder="Contact Full Name"
                value={contact?.name}
                onChangeText={(val) => setName(val)}
            />
        </Section>
    );
};

const styles = StyleSheet.create({
    section: {
        marginTop: '5%',
        alignSelf: 'center',
        width: '90%',
        height: '90%',
        padding: 10,
      },    
});

export default ContactForm;