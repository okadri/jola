import React, { useMemo } from "react";
import { MainStackParamList } from "../types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Text,
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Entypo, FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Accordion from 'react-native-collapsible/Accordion';
import BottomSheet from '@gorhom/bottom-sheet';

import {
  selectCurrentContact,
  selectLoadingContacts,
  selectExpandedSections,
  selectSmsTemplate
} from "../store/contact/selectors";
import { StyleSheet, ActivityIndicator, View, Platform, Linking } from "react-native";
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
  const smsTemplate = selectSmsTemplate();
  const dispatch = useDispatch();
  const snapPoints = useMemo(() => ['25%', '50%'], []);

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

  const openSmsUrl = (phone: string | undefined) => {
    const separator = Platform.OS === "ios" ? "&" : "?";
    Linking.openURL(`sms:${phone}${separator}body=${smsTemplate}`);
  }

  const openWhatsappUrl = (phone: string | undefined) => {
    Linking.openURL(`https://api.whatsapp.com/send?phone=${phone}`)
  }

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
            style={styles.meta}>
            {contact?.street}, {contact?.city}, {contact?.state} {contact?.zipcode}
          </Text>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={styles.meta}>
            {contact?.phone} {contact?.phone && contact?.email ? '|' : null} {contact?.email}
          </Text>
          <View style={styles.buttons}>
            {contact?.phone ?
              <>
                <MaterialIcons
                  name="phone"
                  size={20}
                  color={isDarkmode
                    ? themeColor.white
                    : themeColor.dark100}
                  style={styles.button}
                  onPress={() => Linking.openURL(`tel:${contact.phone}`)}
                />
                <MaterialIcons
                  name="message"
                  size={20}
                  color={isDarkmode
                    ? themeColor.white
                    : themeColor.dark100}
                  style={styles.button}
                  onPress={() => openSmsUrl(contact.phone)}
                />
                <FontAwesome5
                  name="whatsapp"
                  size={20}
                  color={isDarkmode
                    ? themeColor.white
                    : themeColor.dark100}
                  style={styles.button}
                  onPress={() => openWhatsappUrl(contact.phone)}
                />
              </>
              : null}
            {contact?.email ?
              <Entypo
                name="email"
                size={20}
                color={isDarkmode
                  ? themeColor.white
                  : themeColor.dark100}
                style={styles.button}
                onPress={() => Linking.openURL(`mailto:${contact.email}`)}
              />
              : null}
          </View>
          <Accordion
            activeSections={expandedSections}
            sections={SECTIONS}
            renderHeader={renderSectionHeader}
            renderContent={renderSectionContent}
            onChange={(sections) => dispatch(updateEpandedSections(sections))}
            underlayColor={themeColor.primaryTransparent200}
          />
          <BottomSheet snapPoints={snapPoints}>
            <View>
              <Text>This is a sheet</Text>
            </View>
          </BottomSheet>
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
  meta: {
    textAlign: 'center',
    marginLeft: 15,
    marginRight: 15,
    fontSize: 15,
    color: themeColor.gray300,
  },
  buttons: {
    flexDirection: 'row',
    alignContent: 'center',
  },
  button: {
    flex: 1,
    textAlign: 'center',
    padding: 15,
    margin: 15,
  },
});
