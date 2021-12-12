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
  selectConfirmArchive,
  selectCurrentContact,
  selectLoadingContacts,
  selectShowReportModal,
} from "../store/contact/selectors";
import { StyleSheet, ActivityIndicator } from "react-native";
import ContactSheet from "../components/ContactSheet";
import { darkMap } from "../constants/mapStyles";
import { FloatingAction } from "react-native-floating-action";
import { useDispatch } from "react-redux";
import { archiveContact, confirmArchive, showReportVisitModal } from "../store/contact/actions";
import ConfirmModal from "../components/ConfirmModal";
import ReportVisitModal from "../components/reportVisitModal";

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "ContactScreen">) {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContact = selectLoadingContacts();
  const contact = selectCurrentContact();
  const showArchiveConfirm = selectConfirmArchive();
  const snapPoints = useMemo(() => contact?.visits?.length ? ['30%', '70%'] : ['30%'], []);
  const dispatch = useDispatch();

  const hideArchiveConfirm = () => dispatch(confirmArchive(false));

  const mapDarkStyle = isDarkmode ? darkMap : [];

  const actions = [
    {
      text: "Archive Contact",
      icon: require("../../assets/images/archive.png"),
      name: "archive",
      color: themeColor.danger700,
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
      text: "Navigate",
      icon: require("../../assets/images/navigate.png"),
      name: "navigate",
      color: themeColor.primary,
      position: 3,
    },
    {
      text: "Report Visit",
      icon: require("../../assets/images/report.png"),
      name: "report",
      color: themeColor.primary,
      position: 4,
    },
  ];

  const doArchiveContact = () => {
    dispatch(archiveContact(contact));
    navigation.navigate("MainTabs");
  };
    
  const runAction = (action: string | undefined) => {
    switch (action) {
      case "archive":
        dispatch(confirmArchive(true));
        break;

      case "edit":
        navigation.navigate("ContactForm");
        break;

      case "report":
        dispatch(showReportVisitModal(true));
        break;

      default:
        break;
    }
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
          <ConfirmModal
            showConfirmation={showArchiveConfirm}
            message="Are you sure you want to logout?"
            confirmBtnTxt="Yes"
            confirmAction={doArchiveContact}
            cancelAction={hideArchiveConfirm}
          />
          <ReportVisitModal />
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
            distanceToEdge={{ vertical: 320, horizontal: 30 }}
            onPressItem={name => {
              runAction(name);
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
