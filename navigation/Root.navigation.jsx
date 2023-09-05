import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "./Tabs.navigation";
import Stacks from "./Stack.navigation";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  return (
    <Stack.Navigator
      initialRouteName='Tab'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Tab' component={Tabs} />
      <Stack.Screen name='Stack' component={Stacks} />
    </Stack.Navigator>
  );
}
