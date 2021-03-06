import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, ListRenderItemInfo } from "react-native";
import { supabase } from "../initSupabase";
import {
  Layout,
  TopNav,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import { FloatingAction } from "react-native-floating-action";
import ContactCard from "../components/ContactCard";
import ContactCardActions from "../components/ContactCardActions";
import { Contact } from "../store/contact/model";

import { useDispatch } from "react-redux";
import { loadContacts, setCurrentContact } from "../store/contact/actions";
import { loadValues } from "../store/shared/actions";
import { selectDisplayContacts, selectLoadingContacts } from "../store/contact/selectors";
import Toolbar from "../components/Toolbar";
import OptionsModal from "../components/OptionsModal";
import ConfirmModal from "../components/ConfirmModal";
import { confirmLogout } from "../store/shared/actions";
import { selectConfirmLogout } from "../store/shared/selectors";
import { useNavigation } from "@react-navigation/core";
import { SwipeListView } from "react-native-swipe-list-view";

export default function () {
  const navigation = useNavigation();
  const { isDarkmode, setTheme } = useTheme();
  const loadingContacts = selectLoadingContacts();
  const showLogoutConfirm = selectConfirmLogout();
  const contacts = selectDisplayContacts();
  const dispatch = useDispatch();
  const logout = () => dispatch(confirmLogout(true));
  const hideLogout = () => dispatch(confirmLogout(false));

  const runAction = (action: string | undefined) => {
    switch (action) {
      case "create":
        dispatch(setCurrentContact());
        navigation.navigate("ContactForm");
        break;

      default:
        break;
    }
  }

  const actions = [
    {
      text: "Create Contact",
      icon: require("../../assets/images/add.png"),
      name: "create",
      position: 1,
    },
  ];

  const toggleTheme = () => {
    if (isDarkmode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const doLogout = async () => {
    hideLogout();
    const { error } = await supabase.auth.signOut();
    if (!error) {
      alert("Signed out!");
    }
    if (error) {
      alert(error.message);
    }
  }

  useEffect(() => {
    dispatch(loadContacts());
    dispatch(loadValues());
  }, [dispatch]);

  return (
    <Layout>
      <TopNav
        middleContent="Home"
        leftContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        leftAction={toggleTheme}
        rightContent={
          <Ionicons
            name="log-out"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={logout}
      />
      <OptionsModal />
      <ConfirmModal
        showConfirmation={showLogoutConfirm}
        message="Are you sure you want to logout?"
        confirmBtnTxt="Yes"
        confirmAction={doLogout}
        cancelAction={hideLogout}
      />
      <View style={styles.container} >
        {loadingContacts ?
          <ActivityIndicator size="large" /> :
          <>
                <Toolbar />
                {contacts && contacts.length > 0 ?
                  <SwipeListView
                    data={contacts}
                    renderItem={(rowData: ListRenderItemInfo<Contact>) => <ContactCard item={rowData.item} />}
                    renderHiddenItem={(rowData: ListRenderItemInfo<Contact>) => <ContactCardActions item={rowData.item} />}
                    keyExtractor={item => item.id? item.id.toString() : item.name}
                    scrollEnabled={true}
                    disableRightSwipe
                    rightOpenValue={-80}
                    style={styles.contactList}
                  /> :
                  <Text
                    style={[styles.noResults, isDarkmode ? styles.textDark : null]}>
                    No Results!
                  </Text>
                }
          </>
        }
      </View>
      <FloatingAction
        actions={actions}
        color={themeColor.primary}
        overrideWithAction={true} // Remove when adding more actions
        onPressItem={name => {
          runAction(name);
        }} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contactList: {
    width: '100%',
  },
  textDark: {
    color: themeColor.white100,
  },
  noResults: {
    marginTop: 30,
    alignSelf: "center",
  },
});