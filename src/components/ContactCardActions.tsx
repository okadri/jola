import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Contact } from "../store/contact/model";
import { Text, themeColor, useTheme } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { archiveContact } from "../store/contact/actions";

const ContactCardActions = ({ item }: { item: Contact }) => {
    const { isDarkmode } = useTheme();
    const dispatch = useDispatch();

    return (
        <Pressable
            style={[styles.actionCard, isDarkmode ? styles.bgDark : styles.bgLight]}
            onPress={() => dispatch(archiveContact(item))}>
                <Text style={styles.btnText}>
                        Archive
                </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    actionCard: {
        borderColor: '#cecece',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        height: 70,
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