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
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import {
  selectCurrentContact,
  selectLoadingContacts,
} from "../store/contact/selectors";
import { StyleSheet, ActivityIndicator } from "react-native";
import ContactSheet from "../components/ContactSheet";
import { darkMap } from "../constants/mapStyles";
import { FloatingAction } from "react-native-floating-action";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContact = selectLoadingContacts();
  const contact = selectCurrentContact();
  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const mapDarkStyle = isDarkmode ? darkMap : [];

  const actions = [
    {
      text: "Navigate",
      icon: require("../../assets/images/navigate.png"),
      name: "navigate",
      color: themeColor.primary,
      position: 1,
    },
    {
      text: "Edit Contact",
      icon: require("../../assets/images/edit.png"),
      name: "edit",
      color: themeColor.primary,
      position: 2,
    },
    {
      text: "Archive Contact",
      icon: require("../../assets/images/archive.png"),
      name: "archive",
      color: themeColor.danger700,
      position: 3,
    },
  ];

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
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 38.540980,
              longitude: -121.562210,
              latitudeDelta: 0.05,
              longitudeDelta: 0.03,
            }}
            provider={PROVIDER_GOOGLE}
            customMapStyle={mapDarkStyle}
          />
          <FloatingAction
            actions={actions}
            color={themeColor.primary}
            distanceToEdge={{vertical: 320, horizontal: 30}}
            onPressItem={name => {
              console.log(name);
            }} />
          <BottomSheet snapPoints={snapPoints}
            backgroundStyle={{ backgroundColor: isDarkmode ? themeColor.dark100 : themeColor.white }}>
            <BottomSheetScrollView>
              <ContactSheet contact={contact} />
            </BottomSheetScrollView>
          </BottomSheet>
        </>
      }

    </Layout>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  }
});
