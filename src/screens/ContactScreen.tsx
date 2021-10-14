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

import { selectCurrentContact, selectLoadingContacts } from "../store/contact/selectors";
import { Text, StyleSheet, ActivityIndicator } from "react-native";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContact = selectLoadingContacts();
  let contact = selectCurrentContact();

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
      {loadingContact ?
        <ActivityIndicator size="large" /> :
        <Text
          style={[styles.name, isDarkmode ? styles.textDark : null]}>
          {contact?.name}'s Profile
        </Text>
      }

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
