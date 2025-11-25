import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Posts from "./index";
import Gallery from "./gallery";

const TopTabs = createMaterialTopTabNavigator();

export default function ProfileTabsLayout() {
  return (
    <TopTabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#1e90ff",
        tabBarInactiveTintColor: "gray",
        tabBarIndicatorStyle: { backgroundColor: "#1e90ff" },
        tabBarLabelStyle: { fontSize: 14, fontWeight: "600" },
      }}
    >
      <TopTabs.Screen
        name="Posts"
        component={Posts}
        options={{ title: "Posts" }}
      />

      <TopTabs.Screen
        name="Gallery"
        component={Gallery}
        options={{ title: "Galería" }}
      />
    </TopTabs.Navigator>
  );
}
