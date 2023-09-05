import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { View, useColorScheme } from "react-native";
import { Asset } from "expo-asset";
import RootNavigation from "./navigation/Root.navigation";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useCallback, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components/native";
import { LightTheme, DarkTheme } from "./styles/themes";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Notice from "./components/Notice";
import Login from "./screens/Tabs/Login";

SplashScreen.preventAutoHideAsync();

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

const loadImages = (images) =>
  images.map((image) => {
    if (typeof image === "string") {
      return Image.prefetch(image);
    } else {
      return Asset.loadAsync(image);
    }
  });

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const isDark = useColorScheme() === "dark";

  useEffect(() => {
    const getLogin = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("logined");
        return jsonValue != null ? true : false;
      } catch (e) {
        return false;
      }
    };

    const prepare = async () => {
      try {
        const fonts = loadFonts([Ionicons.font]);
        const assets = loadImages([require("./assets/banner-1.png")]);

        if (await getLogin()) {
          setLogin(true);
        }
        await Promise.all([...fonts, ...assets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if (!isLogin) {
    return (
      <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
        <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
          <Login setLogin={setLogin} />
        </ThemeProvider>
        <StatusBar style={isDark ? "light" : "dark"} />
      </View>
    );
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <ThemeProvider theme={isDark ? DarkTheme : LightTheme}>
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
      </ThemeProvider>
      <StatusBar style={isDark ? "light" : "dark"} />
    </View>
  );
}
