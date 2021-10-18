import React from "react";
import { MainStackParamList } from "../types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Text,
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import Accordion from 'react-native-collapsible/Accordion';

import {
  selectCurrentContact,
  selectLoadingContacts,
  selectExpandedSections
} from "../store/contact/selectors";
import { StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { updateEpandedSections } from "../store/contact/actions";
import ContactSectionHeader from "../components/ContactSectionHeader";
import ContactSectionContent from "../components/ContactSectionContent";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContact = selectLoadingContacts();
  const contact = selectCurrentContact();
  const expandedSections = selectExpandedSections();
  const dispatch = useDispatch();

  const SECTIONS = [
    {
      title: "Visit History",
      icon: "calendar",
    },
    {
      title: "Notes",
      icon: "clipboard",
    },
    {
      title: "Country of Origin",
      icon: "globe",
    },
    {
      title: "Spoken Languages",
      icon: "chatbubbles",
    },
  ];

  const renderSectionHeader = (
    { title, icon }:
    { title: string, icon: string }
  ) => <ContactSectionHeader title={title} icon={icon} />

  const renderSectionContent = (
    { title }:
    { title: string }
  ) => <ContactSectionContent title={title} contact={contact} />

  return (
    <Layout>
      <TopNav
        middleContent={contact?.name}
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
        <>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.name}>
            {contact?.name}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.address}>
            {contact?.street}, {contact?.city}, {contact?.state} {contact?.zipcode}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.meta}>
            {contact?.phone} {contact?.phone && contact?.email ? '|' : null} {contact?.email}
          </Text>
          <Accordion
            activeSections={expandedSections}
            sections={SECTIONS}
            renderHeader={renderSectionHeader}
            renderContent={renderSectionContent}
            onChange={(sections) => dispatch(updateEpandedSections(sections))}
            underlayColor={themeColor.primaryTransparent200}
          />
        </>
      }

    </Layout>
  );
}

const styles = StyleSheet.create({
  name: {
    textAlign: 'center',
    margin: 10,
    marginTop: 20,
    fontSize: 40,
  },
  address: {
    textAlign: 'center',
    margin: 5,
    fontSize: 20,
    color: themeColor.gray300,
  },
  meta: {
    textAlign: 'center',
    margin: 5,
    fontSize: 15,
    color: themeColor.gray300,
  },
});
