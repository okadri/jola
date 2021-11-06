import React from "react";
import { StyleSheet, View } from "react-native";
import { Text, themeColor } from "react-native-rapi-ui";
import { Contact } from "../store/contact/model";
import Moment from 'moment';

const ContactVisits = ({ contact }: { contact: Contact | undefined }) => {
    return (
        <View style={styles.container}>
            <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                style={styles.timeLineTitle}>
                {contact?.visits?.length ? "Visit History" : "No Visit history"}
            </Text>
            {contact?.visits?.length ?
                <>
                    <View style={styles.timeLine} />
                    <View style={styles.timeLineContent}>
                        {contact?.visits?.sort((v1, v2) => v1.created_at < v2.created_at ? 1 :
                            v1.created_at > v2.created_at ? -1 : 0
                        ).map((v, i) => (
                            <View style={i % 2 ? styles.visitRight : styles.visitLeft} key={v.id}>
                                <View style={[styles.date, i % 2 ? styles.alignLeft : styles.alignRight]}>
                                    <Text style={styles.dateText}>{Moment(v.created_at).fromNow()}</Text>
                                </View>
                                <View style={[, i % 2 ? styles.alignLeft : styles.alignRight]}>
                                    <Text style={styles.createdBy}>{v.created_by}</Text>
                                    <Text>{v.mood}</Text>
                                    {v.note ? <Text>{v.note}</Text> : null}
                                </View>
                            </View>
                        ))}
                    </View>
                </> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    timeLineTitle: {
        fontSize: 30,
        color: themeColor.gray300,
        alignSelf: "center",
    },
    timeLine: {
        borderColor: themeColor.gray100,
        position: "absolute",
        height: "100%",
        marginTop: 70,
        left: "50%",
        width: 9,
        borderLeftWidth: 2,
        marginLeft: -1,
    },
    timeLineContent: {
        flex: 1,
        marginTop: 50,
    },
    visitLeft: {
        width: "50%",
        alignItems: 'flex-end',
        padding: 10,
        textAlign: "right",
    },
    visitRight: {
        width: "50%",
        alignSelf: 'flex-end',
        padding: 10,
    },
    alignRight: {
        alignItems: 'flex-end',
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
    },
    alignLeft: {
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    date: {
        backgroundColor: themeColor.primaryTransparent300,
        paddingHorizontal: 9,
        marginHorizontal: -9,
        marginBottom: 5,
        paddingVertical: 3,
        width: "100%",
    },
    dateText: {
        fontWeight: "bold",
    },
    createdBy: {
        color: themeColor.gray300,
    }
});

export default ContactVisits;