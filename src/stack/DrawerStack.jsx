import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TabStack from "./TabStack";
import AccountScreen from "../screens/Vehicle/AccountScreen";


const Drawer = createDrawerNavigator();

export default function DrawerStack() {
    return (
        <Drawer.Navigator>
        <Drawer.Screen name="TabStack" >{()=> <TabStack/>}</Drawer.Screen>    
        <Drawer.Screen name="Account" component={AccountScreen} />
        </Drawer.Navigator>
    );
    }