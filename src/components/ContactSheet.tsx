import React from "react";
import { StyleSheet, View, Linking, Platform } from "react-native";
import { Entypo, FontAwesome, FontAwesome5, MaterialIcons } from "@expo/vector-icons";

import { Contact } from "../store/contact/model";
import { Avatar, Text, themeColor, useTheme } from 'react-native-rapi-ui';
import { selectSmsTemplate } from "../store/contact/selectors";
import FLAGS from "../constants/flags";
import ContactVisits from "./ContactVisits";

const ContactSheet = ({ contact }: { contact: Contact | undefined }) => {
    const { isDarkmode } = useTheme();
    const smsTemplate = selectSmsTemplate();

    const flag = contact?.country_of_origin && contact?.country_of_origin.code.toLocaleUpperCase() in FLAGS ?
        FLAGS[contact?.country_of_origin.code.toLocaleUpperCase()] : null;

    const openSmsUrl = (phone: string | undefined) => {
        const separator = Platform.OS === "ios" ? "&" : "?";
        Linking.openURL(`sms:${phone}${separator}body=${smsTemplate}`);
    }

    const openWhatsappUrl = (phone: string | undefined) => {
        Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}`)
    }

    return (
        <>
            <View style={styles.container}>
                <View style={styles.avatarContainer}>
                    <Avatar
                        source={flag}
                        size="lg"
                        shape="round"
                    />
                </View>
                <View style={styles.textContainer}>
                    <View style={styles.metaLine}>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.name}>
                            {contact?.name}
                        </Text>
                    </View>
                    <View style={styles.metaLine}>
                        <FontAwesome
                            name="map-marker"
                            size={15}
                            style={styles.metaIcon}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.gray300}
                        />
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.metaText}>
                            {contact?.street}, {contact?.city}, {contact?.state} {contact?.zipcode}
                        </Text>
                    </View>
                    {contact?.email ? <View style={styles.metaLine}>
                        <MaterialIcons
                            name="email"
                            size={15}
                            style={styles.metaIcon}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.gray300}
                        />
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.metaText}>
                            {contact?.email}
                        </Text>
                    </View> : null}
                    {contact?.phone ? <View style={styles.metaLine}>
                        <MaterialIcons
                            name="phone"
                            size={15}
                            style={styles.metaIcon}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.gray300}
                        />
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.metaText}>
                            {contact?.phone}
                        </Text>
                    </View> : null}
                    {contact?.languages?.length ? <View style={styles.metaLine}>
                        <FontAwesome
                            name="language"
                            size={15}
                            style={styles.metaIcon}
                            color={isDarkmode
                                ? themeColor.white
                                : themeColor.gray300}
                        />
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={styles.metaText}>
                            {contact?.languages?.map(l => l.name).join(', ')}
                        </Text>
                    </View> : null}
                </View>
            </View>
            <View style={styles.buttons}>
                <MaterialIcons
                    name="phone"
                    size={20}
                    color={!contact?.phone ? themeColor.gray100 : isDarkmode
                        ? themeColor.white
                        : themeColor.dark100}
                    style={[styles.button, contact?.email ? null : { color: themeColor.gray300 }]}
                    onPress={() => contact?.phone ? Linking.openURL(`tel:${contact.phone}`) : null}
                />
                <MaterialIcons
                    name="message"
                    size={20}
                    color={!contact?.phone ? themeColor.gray100 : isDarkmode
                        ? themeColor.white
                        : themeColor.dark100}
                    style={[styles.button, contact?.email ? null : { color: themeColor.gray300 }]}
                    onPress={() => contact?.phone ? openSmsUrl(contact.phone) : null}
                />
                <FontAwesome5
                    name="whatsapp"
                    size={20}
                    color={!contact?.phone ? themeColor.gray100 : isDarkmode
                        ? themeColor.white
                        : themeColor.dark100}
                    style={[styles.button, contact?.email ? null : { color: themeColor.gray300 }]}
                    onPress={() => contact?.phone ? openWhatsappUrl(contact.phone) : null}
                />
                <Entypo
                    name="mail"
                    size={20}
                    color={isDarkmode
                        ? themeColor.white
                        : themeColor.dark100}
                    style={styles.button}
                    onPress={() => contact?.email ? Linking.openURL(`mailto:${contact.email}`) : null}
                />
            </View>
            <ContactVisits contact={contact} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    avatarContainer: {
        width: 70,
        marginLeft: 20,
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        margin: 10,
        fontSize: 40,
    },
    metaLine: {
        marginLeft: 15,
        marginRight: 15,
        fontSize: 15,
        flexDirection: 'row',
    },
    metaIcon: {
        width: 25,
        alignSelf: 'center',
        textAlign: 'center',
    },
    metaText: {
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