import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Contact } from "../store/contact/model";
import Moment from 'moment';

const ContactVisits = ({ contact }: { contact: Contact | undefined }) => {
    return (
        <View style={styles.container}>
            <View style={styles.timeLine} />
            {contact?.visits?.map((v, i) => (
                <View style={i%2 ? styles.visitRight : styles.visitLeft} key={v.id}>
                    <Text>{Moment(v.created_at).fromNow()}</Text>
                    <Text>By {v.created_by}</Text>
                    <Text>{v.mood}</Text>
                    {v.note ? <Text>{v.note}</Text> : null}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    timeLine: {
        borderColor: themeColor.gray100,
        position: "absolute",
        height: "100%",
        left: "50%",
        borderLeftWidth: 2,
        marginLeft: -2,
        top: 0,
    },
    visitLeft: {
        width: "50%",
        alignItems: 'flex-end',
        padding: 10,
    },
    visitRight: {
        width: "50%",
        alignSelf: 'flex-end',
        padding: 10,
    },
});

export default ContactVisits;