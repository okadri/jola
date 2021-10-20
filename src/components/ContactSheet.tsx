import React from "react";
import { StyleSheet, View, Linking, Platform } from "react-native";
import { Entypo, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import Accordion from 'react-native-collapsible/Accordion';


import { Contact } from "../store/contact/model";
import { Text, themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { updateEpandedSections } from "../store/contact/actions";
import ContactSectionHeader from "../components/ContactSectionHeader";
import ContactSectionContent from "../components/ContactSectionContent";
import { selectExpandedSections, selectSmsTemplate } from "../store/contact/selectors";

const ContactSheet = ({ contact }: { contact: Contact | undefined }) => {
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();
    const smsTemplate = selectSmsTemplate();
    const expandedSections = selectExpandedSections();

    const SECTIONS = [
        {
            title: "Visit History",
            icon: "calendar",
        },
        {
            title: "Notes",
            icon: "clipboard",
        },
        {
            title: "Country of Origin",
            icon: "globe",
        },
        {
            title: "Spoken Languages",
            icon: "chatbubbles",
        },
    ];

    const renderSectionHeader = (
        { title, icon }:
            { title: string, icon: string }
    ) => <ContactSectionHeader title={title} icon={icon} />

    const renderSectionContent = (
        { title }:
            { title: string }
    ) => <ContactSectionContent title={title} contact={contact} />

    const openSmsUrl = (phone: string | undefined) => {
        const separator = Platform.OS === "ios" ? "&" : "?";
        Linking.openURL(`sms:${phone}${separator}body=${smsTemplate}`);
    }

    const openWhatsappUrl = (phone: string | undefined) => {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}`)
    }

    return (
        <>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.name}>
                {contact?.name}
            </Text>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.meta}>
                {contact?.street}, {contact?.city}, {contact?.state} {contact?.zipcode}
            </Text>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.meta}>
                {contact?.phone} {contact?.phone && contact?.email ? '|' : null} {contact?.email}
            </Text>
            <View style={styles.buttons}>
                {contact?.phone ?
                    <>
                        <MaterialIcons
                            name="phone"
                            size={20}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.dark100}
                            style={styles.button}
                            onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                        />
                        <MaterialIcons
                            name="message"
                            size={20}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.dark100}
                            style={styles.button}
                            onPress={() => openSmsUrl(contact.phone)}
                        />
                        <FontAwesome5
                            name="whatsapp"
                            size={20}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.dark100}
                            style={styles.button}
                            onPress={() => openWhatsappUrl(contact.phone)}
                        />
                    </>
                    : null}
                {contact?.email ?
                    <Entypo
                        name="email"
                        size={20}
                        color={isDarkmode
                            ? themeColor.white
                            : themeColor.dark100}
                        style={styles.button}
                        onPress={() => Linking.openURL(`mailto:${contact.email}`)}
                    />
                    : null}
            </View>
            <Accordion
                activeSections={expandedSections}
                sections={SECTIONS}
                renderHeader={renderSectionHeader}
                renderContent={renderSectionContent}
                onChange={(sections) => dispatch(updateEpandedSections(sections))}
                underlayColor={themeColor.primaryTransparent200}
            />
        </>
    );
};

const styles = StyleSheet.create({
    name: {
        textAlign: 'center',
        margin: 10,
        marginTop: 20,
        fontSize: 40,
    },
    meta: {
        textAlign: 'center',
        marginLeft: 15,
        marginRight: 15,
        fontSize: 15,
        color: themeColor.gray300,
    },
    buttons: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    button: {
        flex: 1,
        textAlign: 'center',
        padding: 15,
        margin: 15,
    },
});

export default ContactSheet;