import React, { useMemo } from "react";
import { MainStackParamList } from "../types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Layout,
  TopNav,
  themeColor,
  useTheme,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

import {
  selectCurrentContact,
  selectLoadingContacts,
} from "../store/contact/selectors";
import { StyleSheet, ActivityIndicator } from "react-native";
import ContactSheet from "../components/ContactSheet";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContact = selectLoadingContacts();
  const contact = selectCurrentContact();
  const snapPoints = useMemo(() => ['30%', '70%'], []);

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

        <BottomSheet snapPoints={snapPoints}
          backgroundStyle={{backgroundColor: isDarkmode ? themeColor.dark100 : themeColor.white}}>
          <BottomSheetScrollView>
            <ContactSheet contact={contact} />
          </BottomSheetScrollView>
        </BottomSheet>
      }

    </Layout>
  );
}

const styles = StyleSheet.create({
});
