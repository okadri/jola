import React from "react";
import { MainStackParamList } from "../types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";

import { selectCurrentContact } from "../store/contact/selectors";
import { StyleSheet } from "react-native";
import ContactForm from "../components/ContactForm";
import { useDispatch } from "react-redux";
import { createContact, updateContact } from "../store/contact/actions";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const contact = selectCurrentContact();
  const dispatch = useDispatch()

  const onSubmit = (values: any) => {
    if (contact) {
      dispatch(updateContact(values));
      navigation.goBack();
    } else {
      dispatch(createContact(values));
      navigation.replace("ContactScreen");
    }
  }

  return (
    <Layout>
      <TopNav
        middleContent={contact ? contact.name : "Create Contact"}
        leftContent={
          <Ionicons
            name="chevron-back"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={() => navigation.goBack()}
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      />
      <ContactForm
        onSubmit={onSubmit}
        contact={contact}
      />

    </Layout>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
  textDark: {
    color: themeColor.white100,
  },
});
