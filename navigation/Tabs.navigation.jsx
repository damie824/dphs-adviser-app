import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Tabs/Home";
import { useColorScheme } from "react-native";
import Planner from "../screens/Tabs/Planner";
import Settings from "../screens/Tabs/Settings";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: "#2eceff",
        tabBarInactiveTintColor: isDark ? "#dbdbdb" : "#757575",
        tabBarStyle: {
          backgroundColor: isDark ? "#222222" : "#FFFFFF",
          borderTopWidth: isDark ? 0 : 1,
          paddingTop: 15,
          paddingBottom: 50,
          height: 110,
        },
        headerStyle: {
          backgroundColor: isDark ? "#222222" : "#FFFFFF",
        },
        headerShadowVisible: isDark ? false : true,
        headerTitleStyle: {
          color: isDark ? "#d4d4d4" : "#000000",
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            );
          },
          headerTitleAlign: "left",
        }}
      />
      <Tab.Screen
        name='Planner'
        component={Planner}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "ios-book" : "ios-book-outline"}
                size={size}
                color={color}
              />
            );
          },
          headerTitleAlign: "left",
        }}
      />
      <Tab.Screen
        name='Settings'
        component={Settings}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            return (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={size}
                color={color}
              />
            );
          },
          headerTitleAlign: "left",
        }}
      />
    </Tab.Navigator>
  );
}
