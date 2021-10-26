import React from "react";
import { KeyboardAvoidingView, ScrollView, StyleSheet } from "react-native";
import { Button, Picker, Section, Text, TextInput, themeColor } from 'react-native-rapi-ui';
import { Formik } from "formik";
import { Contact } from "../store/contact/model";
import * as yup from "yup";
import { selectCountries, selectLanguages } from "../store/shared/selectors";

//  !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const streetRegExp = /^\w+(\s\w+){2,}/i;
const zipcodeRegExp = /^\d{5}$/;

const validationSchema = yup.object({
    name: yup.string().required().min(4),
    email: yup.string().email().nullable(),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').nullable(),
    street: yup.string().required().matches(streetRegExp, 'A valid street address is required'),
    city: yup.string().required().min(4),
    state: yup.string().required().min(2).max(2),
    zipcode: yup.string().matches(zipcodeRegExp, 'Invalid ZipCode'),
});

const ContactForm = ({ contact, onSubmit }: { contact: Contact | undefined, onSubmit: any }) => {
    const countries = selectCountries();
    const languages = selectLanguages();

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView>
                <Formik
                    initialValues={{
                        name: contact?.name,
                        email: contact?.email,
                        phone: contact?.phone,
                        street: contact?.street,
                        city: contact?.city,
                        state: contact?.state,
                        zipcode: contact?.zipcode,
                        country_of_origin: contact?.country_of_origin,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => onSubmit(values)}
                >
                    {props => (
                        <Section style={styles.section}>
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                onChangeText={props.handleChange('name')}
                                value={props.values.name}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.name && props.errors.name}
                            </Text>
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.email && props.errors.email}
                            </Text>
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                                onChangeText={props.handleChange('phone')}
                                value={props.values.phone}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.phone && props.errors.phone}
                            </Text>
                            <Text style={styles.label}>Street Address</Text>
                            <TextInput
                                onChangeText={props.handleChange('street')}
                                value={props.values.street}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.street && props.errors.street}
                            </Text>
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                onChangeText={props.handleChange('city')}
                                value={props.values.city}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.city && props.errors.city}
                            </Text>
                            <Text style={styles.label}>State</Text>
                            <TextInput
                                onChangeText={props.handleChange('state')}
                                value={props.values.state}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.state && props.errors.state}
                            </Text>
                            <Text style={styles.label}>Zipcode</Text>
                            <TextInput
                                onChangeText={props.handleChange('zipcode')}
                                value={props.values.zipcode}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.zipcode && props.errors.zipcode}
                            </Text>
                            <Text style={styles.label}>Country of Origin</Text>
                            <Picker
                                items={countries.map(c => {return {label: c.name, value: c.code}})}
                                placeholder="Choose Country"
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.country_of_origin && props.errors.country_of_origin}
                            </Text>
                            <Button style={styles.button} onPress={() => props.handleSubmit()} text="Submit" />
                        </Section>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flex: 1,
        padding: 20,
        margin: 10,
    },
    label: {
        marginTop: 10,
        marginBottom: 10,
    },
    button: {
        borderRadius: 5,
        padding: 10,
        margin: 30,
        backgroundColor: themeColor.primary,
    },
    buttonText: {
        alignSelf: "center",
        color: themeColor.white,
    }
});

export default ContactForm;