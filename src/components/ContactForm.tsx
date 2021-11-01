import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { Button, Picker, Section, Text, TextInput, themeColor } from 'react-native-rapi-ui';
import { Formik } from "formik";
import { Contact } from "../store/contact/model";
import * as yup from "yup";
import { selectCountries, selectLanguages } from "../store/shared/selectors";
import MultiSelect from 'react-native-multiple-select';

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

    const getCountryByCode = (code: string) => countries.find(c => c.code === code);

    const setLanguages = (langCodes, props) => {
        props.setValues(curr => {
            return {
                ...curr,
                languages: languages.filter(l => langCodes.indexOf(l.code) >= 0)
            }
        })
    }
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled={Platform.OS === "ios"}
        >
            <ScrollView>
                <Formik
                    initialValues={{
                        id: contact?.id,
                        name: contact?.name,
                        email: contact?.email,
                        phone: contact?.phone,
                        street: contact?.street,
                        city: contact?.city,
                        state: contact?.state,
                        zipcode: contact?.zipcode,
                        country_of_origin: contact?.country_of_origin,
                        languages: contact?.languages,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={values => onSubmit(values)}
                >
                    {props => (
                        <Section style={styles.section}>
                            {/* /////// NAME */}
                            <Text style={styles.label}>Full Name</Text>
                            <TextInput
                                onChangeText={props.handleChange('name')}
                                value={props.values.name}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.name && props.errors.name}
                            </Text>
                            {/* /////// EMAIL */}
                            <Text style={styles.label}>Email</Text>
                            <TextInput
                                onChangeText={props.handleChange('email')}
                                value={props.values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.email && props.errors.email}
                            </Text>
                            {/* /////// PHONE */}
                            <Text style={styles.label}>Phone</Text>
                            <TextInput
                                onChangeText={props.handleChange('phone')}
                                value={props.values.phone}
                                keyboardType="phone-pad"
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.phone && props.errors.phone}
                            </Text>
                            {/* /////// STREET */}
                            <Text style={styles.label}>Street Address</Text>
                            <TextInput
                                onChangeText={props.handleChange('street')}
                                value={props.values.street}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.street && props.errors.street}
                            </Text>
                            {/* /////// CITY */}
                            <Text style={styles.label}>City</Text>
                            <TextInput
                                onChangeText={props.handleChange('city')}
                                value={props.values.city}
                                autoCapitalize="words"
                                autoCorrect={false}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.city && props.errors.city}
                            </Text>
                            {/* /////// STATE */}
                            <Text style={styles.label}>State</Text>
                            <TextInput
                                onChangeText={props.handleChange('state')}
                                value={props.values.state}
                                autoCapitalize="characters"
                                autoCorrect={false}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.state && props.errors.state}
                            </Text>
                            {/* /////// ZIPCODE */}
                            <Text style={styles.label}>Zipcode</Text>
                            <TextInput
                                onChangeText={props.handleChange('zipcode')}
                                value={props.values.zipcode}
                                keyboardType="numeric"
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.zipcode && props.errors.zipcode}
                            </Text>
                            {/* /////// COUNTRY */}
                            <Text style={styles.label}>Country of Origin</Text>
                            <Picker
                                items={countries.map(c => { return { label: c.name, value: c.code } })}
                                placeholder="Choose Country"
                                value={props.values.country_of_origin?.code}
                                onValueChange={val => props.values.country_of_origin = getCountryByCode(val)}
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.country_of_origin && props.errors.country_of_origin}
                            </Text>
                            {/* /////// LANGUAGES */}
                            <Text style={styles.label}>Languages</Text>
                            <MultiSelect
                                hideTags
                                items={languages}
                                uniqueKey="code"
                                onSelectedItemsChange={langCodes => setLanguages(langCodes, props)}
                                selectedItems={props.values.languages?.map(l => l.code)}
                                selectText="Pick Languages"
                                searchInputPlaceholderText="Search Languages..."
                                tagRemoveIconColor="#CCC"
                                tagBorderColor="#CCC"
                                tagTextColor="#CCC"
                                selectedItemTextColor="#CCC"
                                selectedItemIconColor="#CCC"
                                itemTextColor="#000"
                                displayKey="name"
                                searchInputStyle={{ color: '#CCC' }}
                                submitButtonColor="#CCC"
                                submitButtonText="Submit"
                            />
                            <Text style={{ color: themeColor.danger }}>
                                {props.touched.country_of_origin && props.errors.country_of_origin}
                            </Text>
                            {/* /////// SUBMIT */}
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