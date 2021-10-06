import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from "react-native";
import { supabase } from "../initSupabase";
import {
  Layout,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
import ContactCard from "../components/ContactCard";
import { Contact } from "../store/contact/model";

import { useDispatch } from "react-redux";
import { loadContacts } from "../store/contact/actions";
import { selectDisplayContacts, selectLoadingContacts } from "../store/contact/selectors";
import Toolbar from "../components/Toolbar";
import OptionsModal from "../components/OptionsModal";
import ConfirmModal from "../components/ConfirmModal";
import { confirmLogout } from "../store/shared/actions";
import { selectConfirmLogout } from "../store/shared/selectors";

export default function () {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContacts = selectLoadingContacts();
  const showLogoutConfirm = selectConfirmLogout();
  const contacts = selectDisplayContacts();
  const dispatch = useDispatch();
  const logout = () => dispatch(confirmLogout(true));
  const hideLogout = () => dispatch(confirmLogout(false));

  const renderItem = ({ item }: { item: Contact }) => <ContactCard item={item} isDarkMode={isDarkmode} />

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
      <OptionsModal isDarkMode={isDarkmode} />
      <ConfirmModal
        isDarkMode={isDarkmode}
        showConfirmation={showLogoutConfirm}
        message="Are you sure you want to logout?"
        confirmBtnTxt="Yes"
        confirmAction={doLogout}
        cancelAction={hideLogout}
        />
      <View style={styles.container} >
        { loadingContacts ?
          <ActivityIndicator size="large" /> :
          <Section style={styles.section}>
            <SectionContent>
              <Toolbar isDarkMode={isDarkmode} />
              { contacts && contacts.length > 0 ?
                <FlatList
                  data={contacts}
                  renderItem={renderItem}
                  keyExtractor={item => item.id.toString()}
                  scrollEnabled={true}
                /> :
                <Text
                  style={[styles.noResults, isDarkmode ? styles.textDark : null]}>
                    No Results!
                </Text>
              }
            </SectionContent>
          </Section>
        }
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: {
    marginTop: 20,
    width: '100%',
    height: '100%',
  },
  contactCard: {
    borderColor: '#4169e1',
    borderRadius: 10,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: 10,
    marginBottom: 5,
  },
  contactName: {
    fontSize: 20,
    textAlign: 'center',
  },
  textDark: {
    color: themeColor.white100,
  },
  noResults: {
    marginTop: 30,
    alignSelf: "center",
  },
});