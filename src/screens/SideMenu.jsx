import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Pants from "./Pants";
import Shirt from "./Shirt";
import Shoes from "./Shoes";
import Home from "./Home";
import Success from "./Success";

const Drawer = createDrawerNavigator();

export default function SideMenu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dress Me">
        <Drawer.Screen name="Dress Me" component={Home} />
        <Drawer.Screen name="Shirt" component={Shirt} />
        <Drawer.Screen name="Pants" component={Pants} />
        <Drawer.Screen name="Shoes" component={Shoes} />
        <Drawer.Screen name=" " component={Success} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
