import React from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Contact } from "../store/contact/model";
import { Text, Avatar, themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { setCurrentContact } from "../store/contact/actions";
import FLAGS from "../constants/flags";

const ContactCard = ({ item }: { item: Contact }) => {
    const navigation = useNavigation();
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();

    const flag = item.country_of_origin && item.country_of_origin.code.toLocaleUpperCase() in FLAGS ?
        FLAGS[item.country_of_origin.code.toLocaleUpperCase()] : null;

    const displayContact = () => {
        dispatch(setCurrentContact(item));
        navigation.navigate("ContactScreen");
    }
    return (
        <Pressable style={[styles.contactCard, isDarkmode ? styles.bgDark : styles.bgLight]} onPress={() => displayContact()}>
            {flag ?
                <Avatar
                    style={styles.flag}
                    source={flag}
                    size="md"
                    shape="round"
                />
                : <View style={styles.flag}></View>}
            <View>
                <Text style={styles.name}>
                    {item.name}
                </Text>
                <Text style={styles.meta}>
                    {item.street}, {item.city}, {item.state} {item.zipcode}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    contactCard: {
        flexDirection: 'row',
        paddingVertical: 10,
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        height: 70,
    },
    name: {
        fontSize: 20,
        textAlign: 'left',
    },
    meta: {
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
        width: 40,
        marginHorizontal: 10,
    }
});

export default ContactCard;