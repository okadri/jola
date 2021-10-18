import React from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useTheme } from 'react-native-rapi-ui';
import { Contact } from "../store/contact/model";

const ContactSectionContent = ({ title, contact }: { title: string, contact: Contact | undefined }) => {
  const { isDarkmode } = useTheme();

  return (
    <View style={styles.sectionContent}>
      <TextInput
        placeholder="Your notes here"
        // value={contact?.name}
        multiline={true}
        numberOfLines={3}
        editable
        />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContent: {
    padding: 10,
  },
});

export default ContactSectionContent;