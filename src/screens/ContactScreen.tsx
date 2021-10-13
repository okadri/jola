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
import ContactProfile from "../components/ContactProfile";
import ContactForm from "../components/ContactForm";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  let contact = selectCurrentContact();
  const handleSubmit = () => navigation.goBack();

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
      { contact?.id ?
          <ContactProfile contact={contact} isDarkMode={isDarkmode} /> :
          <ContactForm onSubmit={handleSubmit} />
      }
    </Layout>
  );
}
