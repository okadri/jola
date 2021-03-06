import { StatusBar } from "expo-status-bar";
import React from "react";
import { ThemeProvider } from "react-native-rapi-ui";
import { Provider } from "react-redux";
import Navigation from "./src/navigation";
import { AuthProvider } from "./src/provider/AuthProvider";
import { store } from "./src/store/rootReducer";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import 'react-native-url-polyfill/auto'

export default function App() {
  const images = [
    require("./assets/images/login.png"),
    require("./assets/images/register.png"),
    require("./assets/images/forget.png"),
  ];
  return (
    <ThemeProvider images={images}>
      <AuthProvider>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </AuthProvider>
      <StatusBar />
    </ThemeProvider>
  );
}
