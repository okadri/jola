import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { StackScreenProps } from "@react-navigation/stack";
import { supabase } from "../initSupabase";
import {
  Layout,
  Button,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import { Ionicons } from "@expo/vector-icons";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'

type Contact = {
  id: string
  name: string
  email: string
}

export default function ({
  navigation,
}: StackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [loading, setLoading] = useState(true)
  const [contacts, setContacts] = useState<Array<Contact>>([])

    const renderItem = ({item}: {item: Contact}) => {
      return (
        <View style={styles.contactCard}>
          <Text style={styles.contactName}>{item.name}</Text>
        </View>
      );
    }
  
  useEffect(() => {
    getContacts()
  }, [])

  async function getContacts() {
    try {
      setLoading(true)
      const user = supabase.auth.user()
      const { data: contacts, error } = await supabase
        .from<Contact>('contacts')
        .select('*')

      if (error) console.log('error', error)
      else setContacts(contacts!)
    } catch (error) {
      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }
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
        leftAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
        rightContent={
          <Ionicons
            name="log-out"
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={async () => {
          const { error } = await supabase.auth.signOut();
          if (!error) {
            alert("Signed out!");
          }
          if (error) {
            alert(error.message);
          }
        }}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Section style={{ marginTop: 20, width: '100%', height: '100%' }}>
          <SectionContent>
          <FlatList
            data={contacts}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={true}
            />
          <Button
              text="Go to second screen"
              onPress={() => {
                navigation.navigate("SecondScreen");
              }}
              style={{
                marginTop: 10,
              }}
            />
          </SectionContent>
        </Section>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
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