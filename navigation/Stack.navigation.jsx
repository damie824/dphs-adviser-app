import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import Meals from "../screens/Stacks/Meals";
import Schedules from "../screens/Stacks/Schedules";
import ChangeInfo from "../screens/Stacks/ChangeInfo";
import Experiments from "../screens/Stacks/Experiment";
import Ddays from "../screens/Stacks/Ddays";

const Stack = createNativeStackNavigator();

export default function Stacks({ navigation: { navigate } }) {
  const isDark = useColorScheme() === "dark";

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? "#222222" : "#FFFFFF",
        },
        headerTitleStyle: {
          color: isDark ? "#d4d4d4" : "#000000",
        },
      }}
    >
      <Stack.Screen
        name='시간표'
        component={Schedules}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("Tab", { screen: "Home" });
                }}
              >
                <Ionicons
                  name='ios-arrow-back-outline'
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='급식'
        component={Meals}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("Tab", { screen: "Home" });
                }}
              >
                <Ionicons
                  name='ios-arrow-back-outline'
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='UserInfo'
        component={ChangeInfo}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("Tab", { screen: "Settings" });
                }}
              >
                <Ionicons
                  name='ios-arrow-back-outline'
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='디데이'
        component={Ddays}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("Tab", { screen: "Home" });
                }}
              >
                <Ionicons
                  name='ios-arrow-back-outline'
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name='실험실'
        component={Experiments}
        options={{
          headerTitleAlign: "left",
          headerLeft: () => {
            return (
              <TouchableOpacity
                onPress={() => {
                  navigate("Tab", { screen: "Home" });
                }}
              >
                <Ionicons
                  name='ios-arrow-back-outline'
                  size={24}
                  color={isDark ? "white" : "black"}
                />
              </TouchableOpacity>
            );
          },
        }}
      />
    </Stack.Navigator>
  );
}
