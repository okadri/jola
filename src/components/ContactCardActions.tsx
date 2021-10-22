import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Contact } from "../store/contact/model";
import { themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { archiveContact } from "../store/contact/actions";

const ContactCardActions = ({ item }: { item: Contact }) => {
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();

    return (
        <Pressable
            style={[styles.actionCard, isDarkmode ? styles.bgDark : styles.bgLight]}
            onPress={() => dispatch(archiveContact(item))}>
                <Text style={[styles.btnText, isDarkmode ? styles.textDark : null]}>
                        Archive
                </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    actionCard: {
        flex: 1,
        marginBottom: 5,
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    btnText: {
        padding: 10,
        fontWeight: "bold",
    },
    textDark: {
        color: themeColor.white100,
    },
    bgDark: {
        backgroundColor: themeColor.danger800,
    },
    bgLight: {
        backgroundColor: themeColor.danger,
    },
  });

export default ContactCardActions;