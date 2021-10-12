import React from "react";
import { KeyboardAvoidingView, KeyboardTypeOptions, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { Section, Text, TextInput, themeColor } from 'react-native-rapi-ui';
import { useDispatch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { createContact } from "../store/contact/actions";
import { Contact } from "../store/contact/model";

const validate = (values: any) => {
    const errors: any = {};
    if (!values.name) {
        errors.name = "Name is required";
    }
    if (!values.email) {
        errors.email = "Email is required";
    }
    // if (!/^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+{2,4}$/i.test(values.email)) {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Email is invalid";
    }
    if (values.phone && !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(values.phone)) {
        errors.phone = "Phone is invalid";
    }
    if (!/^\w+(\s\w+){2,}/i.test(values.street)) {
        errors.street = "A valid street address is required";
    }
    if (!values.city) {
        errors.city = "City is required";
    }
    if (!values.state) {
        errors.state = "State is required";
    }
    if (!/^\d{5}(?:[-\s]\d{4})?$/.test(values.zipcode)) {
        errors.zipcode = "A valid zipcode is required";
    }
    return errors;
}

const RenderField = (
    {
        label,
        keyboardType,
        meta,
        input,
    }: {
        label: string,
        keyboardType: KeyboardTypeOptions | undefined,
        meta: any,
        input: any,
    }) => {
    return (
        <View>
            <Text style={styles.label}>{label}</Text>
            <TextInput keyboardType={keyboardType} onChangeText={input.onChange} {...input.restInput} />
            {meta.touched && (meta.error && <Text style={{ color: themeColor.danger }}>{meta.error}</Text>)}
        </View>
    );
}


const TheForm = (props: any) => {
    
    const { handleSubmit } = props;
    const dispatch = useDispatch();
    
    const submit = (contact: Contact) => {
        dispatch(createContact(contact))
    }

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <ScrollView>
                <Section style={styles.section}>
                    <Field component={RenderField} label="Full Name: " keyboardType="default" name="name" />
                    <Field component={RenderField} label="Email: " keyboardType="email-address" name="email" />
                    <Field component={RenderField} label="Phone: " keyboardType="numeric" name="phone" />
                    <Field component={RenderField} label="Street Address: " keyboardType="default" name="street" />
                    <Field component={RenderField} label="City: " keyboardType="default" name="city" />
                    <Field component={RenderField} label="State: " keyboardType="default" name="state" />
                    <Field component={RenderField} label="Zipcode: " keyboardType="numeric" name="zipcode" />
                    <Pressable
                        style={styles.button}
                        onPress={handleSubmit(submit)}
                    >
                        <Text style={styles.buttonText}>Create</Text>
                    </Pressable>
                </Section>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const ContactForm = reduxForm({
    form: 'contact',
    touchOnChange: false,
    touchOnBlur: true,
    validate,
})(TheForm);

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