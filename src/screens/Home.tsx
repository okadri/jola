import React, { useEffect } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
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
import { selectContacts, selectLoadingContacts } from "../store/contact/selectors";

export default function () {
  const { isDarkmode, setTheme } = useTheme();
  const loadingContacts = selectLoadingContacts();
  const contacts = selectContacts();
  const dispatch = useDispatch();

  const renderItem = ({ item }: { item: Contact }) => <ContactCard item={item} isDarkMode={isDarkmode} />

  const toggleTheme = () => {
    if (isDarkmode) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const logout = async () => {
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
      <View style={styles.container} >
        { loadingContacts ?
          <ActivityIndicator size="large" /> :
          <Section style={styles.section}>
            <SectionContent>
              <FlatList
                data={contacts}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                scrollEnabled={true}
              />
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
});